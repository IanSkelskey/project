import { DocumentReference } from 'firebase/firestore';
import { Project } from './Project';

export interface Status {
    statusId: string;
    name: string;
    projectId: DocumentReference<Project>; // Reference to a board document
}
