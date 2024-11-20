// src/firestore.ts
import { collection, doc, setDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import { Project } from './model/Project';
import { db } from './firebase-config';

export const createUser = async (userData: any) => {
    try {
        const userRef = doc(db, 'users', userData.email);
        await setDoc(userRef, {
            displayName: userData.displayName || null,
            createdAt: new Date(),
        });
        return userRef.id;
    } catch (error) {
        console.error('Error adding user to Firestore:', error);
        throw error;
    }
};

export const checkUserExists = async (email: string) => {
    try {
        const userRef = doc(db, 'users', email);
        const docSnap = await getDoc(userRef);
        return docSnap.exists();
    } catch (error) {
        console.error('Error checking user in Firestore:', error);
        throw error;
    }
};

export async function getUserProjects(email: string): Promise<Project[]> {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            ownerId: data.ownerId,
            createdAt: data.createdAt.toDate(),
            tasks: data.tasks,
        } as Project;
    });
    return projects;
}
