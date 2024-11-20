import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Card, CardContent, CardActions } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { User } from '../model/User';
import { Project } from '../model/Project';
import { getUserProjects } from '../firestore';
import ProjectCreationForm from './ProjectCreationForm';

interface DashboardProps {
    user: User | null;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [creatingProject, setCreatingProject] = useState(false);

    useEffect(() => {
        if (user) {
            getUserProjects(user.email).then((projects) => {
                setProjects(projects);
            });
        }
    }, [user]);

    const handleCreateNewProject = () => {
        setCreatingProject(true);
    };

    const handleProjectCreation = (projectName: string, description: string) => {
        if (!user || !user.email) return;
        const newProject: Project = { id: '', ownerId: user.email, name: projectName, description: description, createdAt: Timestamp.now(), tasks: [] };
        setProjects([...projects, newProject]);
        setCreatingProject(false);
    };

    const handleCancelCreation = () => {
        setCreatingProject(false);
    };

    if (!user) {
        return null;
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4">Your Projects</Typography>
                <Button variant="outlined" color="secondary" onClick={onLogout}>
                    Logout
                </Button>
            </Box>
            {creatingProject ? (
                <ProjectCreationForm onCreate={handleProjectCreation} onCancel={handleCancelCreation} />
            ) : (
                <Box display="flex" flexDirection="column" gap={2}>
                    {projects.length === 0 ? (
                        <Typography>No projects found. Create your first project!</Typography>
                    ) : (
                        projects.map((project: Project, index: number) => (
                            <Card key={index} variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">{project.name}</Typography>
                                    <Typography>{project.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Open Project
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                    )}
                    <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleCreateNewProject}>
                        Create New Project
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default Dashboard;
