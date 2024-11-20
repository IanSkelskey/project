import { Timestamp, DocumentReference } from 'firebase/firestore';
import { User } from './User';
import { Task } from './Task';

export interface Project {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt: Timestamp;
    tasks: DocumentReference<Task>[];
}
