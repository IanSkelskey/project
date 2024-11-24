// models/Project.ts

import { Task } from './Task';

export interface Project {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt: Date;
    tasks: Task[]; // We'll include Task objects directly for simplicity
}
