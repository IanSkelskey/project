import { Timestamp, DocumentReference } from 'firebase/firestore';
import { User } from './User';

export interface Project {
    id: string;
    name: string;
    ownerId: DocumentReference<User>; // Reference to a user document
    createdAt: Timestamp;
}
