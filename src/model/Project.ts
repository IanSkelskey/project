import { Timestamp, DocumentReference } from 'firebase/firestore';
import { User } from './User';
import { Task } from './Task';

export interface Project {
    id: string;
    name: string;
    ownerId: DocumentReference<User>;
    createdAt: Timestamp;
    tasks: DocumentReference<Task>[];
}
