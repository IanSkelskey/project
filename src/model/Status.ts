import { DocumentReference } from 'firebase/firestore';
import { Project } from './Project';

export interface Status {
    id: string;
    name: string;
    projectId: DocumentReference<Project>;
}
