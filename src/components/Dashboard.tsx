import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Container, Typography, Button } from '@mui/material';
import { User } from '../model/User';
import { Project } from '../model/Project';

interface DashboardProps {
    user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    // Define the projects state with Project[] type
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsRef = collection(db, 'projects');
            const q = query(projectsRef, where('ownerId', '==', user.id));
            const querySnapshot = await getDocs(q);

            // Map docs data to Project[]
            setProjects(querySnapshot.docs.map(doc => doc.data() as Project));
        };

        fetchProjects();
    }, [user]);

    return (
        <Container>
            <Typography variant="h4">Your Projects</Typography>
            {projects.length === 0 ? (
                <Typography>No projects found. Create your first project!</Typography>
            ) : (
                projects.map((project, index) => (
                    <Typography key={index}>{project.name}</Typography>
                ))
            )}
            <Button variant="contained" color="primary">Create New Project</Button>
        </Container>
    );
};

export default Dashboard;
