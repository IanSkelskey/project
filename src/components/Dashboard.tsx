// Updated Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Card, CardContent, CardActions } from '@mui/material';
import { User } from '../model/User';
import { Project } from '../model/Project';
import { getUserProjects } from '../firestore';

interface DashboardProps {
    user: User | null; // Allow user to be null
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (user) {
            getUserProjects(user.email).then((projects) => {
                setProjects(projects);
            });
        }
    }, [user]);

    if (!user) {
        return null; // Render nothing if user is null
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4">Your Projects</Typography>
                <Button variant="outlined" color="secondary" onClick={onLogout}>
                    Logout
                </Button>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
                {projects.length === 0 ? (
                    <Typography>No projects found. Create your first project!</Typography>
                ) : (
                    projects.map((project, index) => (
                        <Card key={index} variant="outlined">
                            <CardContent>
                                <Typography variant="h6">{project.name}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Open Project
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                )}
                <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                    Create New Project
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
