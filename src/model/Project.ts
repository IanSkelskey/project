import { Timestamp, DocumentReference } from 'firebase/firestore';
import { User } from './User';

export interface Project {
    id: string;
    name: string;
    ownerId: DocumentReference<User>;
    createdAt: Timestamp;
}
