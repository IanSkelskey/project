import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { User } from '../model/User';
import { Project } from '../model/Project';
import { getUserProjects } from '../firestore';

interface DashboardProps {
    user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    // Define the projects state with Project[] type
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getUserProjects(user.email).then((projects) => {
            setProjects(projects);
        });
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
