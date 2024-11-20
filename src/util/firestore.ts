// src/firestore.ts
import { collection, doc, setDoc, query, where, getDocs, getDoc, deleteDoc } from 'firebase/firestore';
import { Project } from '../model/Project';
import { db } from './firebase';
import { User } from '../model/User';
import { Task } from '../model/Task';

export async function getProjectTasks(projectId: string): Promise<Task[]> {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where('projectId', '==', projectId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title,
            description: data.description,
            statusId: data.statusId,
            projectId: data.projectId,
            assignedTo: data.assignedTo,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        } as Task;
    });
}

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

export const deleteProject = async (projectId: string, ownerId: string) => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        await deleteDoc(projectRef);
        console.log(`Project with ID: ${projectId} has been deleted.`);

        const userRef = doc(db, 'users', ownerId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const updatedProjects = (userData.projects || []).filter((ref: any) => ref.id !== projectId);
            await setDoc(userRef, { projects: updatedProjects }, { merge: true });
            console.log(`Project reference removed from user with ID: ${ownerId}.`);
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};

export const createProject = async (projectData: Project) => {
    try {
        const projectRef = doc(collection(db, 'projects'));
        await setDoc(projectRef, {
            name: projectData.name,
            ownerId: projectData.ownerId,
            description: projectData.description,
            createdAt: projectData.createdAt,
            tasks: projectData.tasks,
        });
        const userRef = doc(db, 'users', projectData.ownerId);
        await setDoc(userRef, {
            projects: [projectRef],
        });
    } catch (error) {
        console.error('Error adding project to Firestore:', error);
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
