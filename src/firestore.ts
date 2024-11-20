// src/firestore.ts
import { collection, addDoc, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { Project } from './model/Project';
import { db } from './firebase-config';

// Function to create a new user with Google data and a unique ID
export const createUser = async (userData: any) => {
    try {
        // Add a new user with auto-generated ID and initial data
        const userRef = await addDoc(collection(db, 'users'), {
            email: userData.email,
            displayName: userData.displayName || null,
            // Additional fields can be added here
        });
        return userRef.id; // Returns the generated ID
    } catch (error) {
        console.error('Error adding user to Firestore:', error);
        throw error;
    }
};

// Function to update user with display name after onboarding
export const updateUserDisplayName = async (userId: string, displayName: string) => {
    try {
        const userDoc = doc(db, 'users', userId);
        await setDoc(userDoc, { displayName }, { merge: true });
        console.log('User display name updated');
    } catch (error) {
        console.error("Error updating user's display name:", error);
        throw error;
    }
};

export const checkUserExists = async (email: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
        return true;
    } else {
        return false;
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
