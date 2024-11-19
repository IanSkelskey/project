import { Timestamp, DocumentReference } from 'firebase/firestore';
import { Project } from './Project';

export interface User {
    userId: string;
    displayName: string;
    email: string;
    profilePhoto?: string;
    createdAt: Timestamp;
    projects: DocumentReference<Project>[];
}
