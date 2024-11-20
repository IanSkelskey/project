// src/firestore.ts
import { collection, doc, setDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import { Project } from '../model/Project';
import { db } from './firebase';
import { User } from '../model/User';

export const createUser = async (userData: User) => {
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

export const createProject = async (projectData: Project) => {
    try {
        const projectRef = doc(collection(db, 'projects'));
        await setDoc(projectRef, {
            name: projectData.name,
            ownerId: projectData.ownerId,
            createdAt: projectData.createdAt,
            tasks: projectData.tasks,
        });
        // Add the project reference to the user's projects
        const userRef = doc(db, 'users', projectData.ownerId);
        await setDoc(userRef, {
            projects: [projectRef],
        });
    } catch (error) {
        console.error('Error adding project to Firestore:', error);
        throw error;
    }
}

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
    const q = query(projectsRef, where('ownerId', '==', email));
    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            description: data.description,
            ownerId: data.ownerId,
            createdAt: data.createdAt.toDate(),
            tasks: data.tasks,
        } as Project;
    });
    return projects;
}
