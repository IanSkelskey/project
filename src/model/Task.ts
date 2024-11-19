import { Timestamp, DocumentReference } from 'firebase/firestore';
import { Project } from './Project';
import { Status } from './Status';
import { User } from './User';

export interface Task {
    taskId: string;
    title: string;
    description: string;
    statusId: DocumentReference<Status>;
    projectId: DocumentReference<Project>;
    assignedTo?: DocumentReference<User>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    blockingTasks?: DocumentReference<Task>[];
    blockedByTasks?: DocumentReference<Task>[];
}
