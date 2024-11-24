// models/Task.ts

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string; // e.g., 'Not Started', 'In Progress', 'Completed'
    priority: string; // e.g., 'Low', 'Medium', 'High'
    projectId: string;
    assignedTo: string; // User ID or name
    createdAt: Date;
    completedAt?: Date;
    dueDate?: Date;
    comments?: string;
    updatedAt: Date;
    blockingTasks?: string[]; // IDs of tasks that this task is blocking
    blockedByTasks?: string[]; // IDs of tasks that block this task
}
