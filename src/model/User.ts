import { Timestamp } from 'firebase/firestore';

export interface User {
    userId: string;
    displayName: string;
    email: string;
    profilePhoto?: string;
    createdAt: Timestamp;
}
