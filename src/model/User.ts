import { Timestamp, DocumentReference } from 'firebase/firestore';
import { Project } from './Project';

export const COLLECTION_NAME: string = 'users';

export interface User {
    email: string;
    displayName: string;
    profilePhoto?: string;
    createdAt: Timestamp;
    projects: DocumentReference<Project>[];
}
