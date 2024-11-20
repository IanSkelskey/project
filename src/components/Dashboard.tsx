import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Button, Box, Card, CardContent, CardActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { User } from '../model/User';
import { Project } from '../model/Project';
import { createProject, getUserProjects, deleteProject } from '../util/firestore';
import ProjectCreationForm from './ProjectCreationForm';
import ProjectTasksView from './ProjectTasksView';

interface DashboardProps {
    user: User | null;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [creatingProject, setCreatingProject] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [viewingProjectId, setViewingProjectId] = useState<string | null>(null);

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

    const handleProjectCreation = (name: string, description: string) => {
        if (!user || !user.email) return;
        const newProject: Project = { id: '', ownerId: user.email, name, description, createdAt: Timestamp.now(), tasks: [] };
        setProjects([...projects, newProject]);
        createProject(newProject);
        setCreatingProject(false);
    };

    const handleDeleteProject = async () => {
        if (selectedProjectId && user && user.email) {
            await deleteProject(selectedProjectId, user.email);
            setProjects(projects.filter(project => project.id !== selectedProjectId));
            setOpenDeleteDialog(false);
        }
    };

    const openDeleteConfirmation = (projectId: string) => {
        setSelectedProjectId(projectId);
        setOpenDeleteDialog(true);
    };

    const handleCancelDeletion = () => {
        setSelectedProjectId(null);
        setOpenDeleteDialog(false);
    };

    const handleOpenProject = (projectId: string) => {
        setViewingProjectId(projectId);
    };

    const handleBackToProjects = () => {
        setViewingProjectId(null);
    };

    if (!user) {
        return null;
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            {viewingProjectId ? (
                <ProjectTasksView projectId={viewingProjectId} onBack={handleBackToProjects} />
            ) : (
                <>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                        <Typography variant="h4">Your Projects</Typography>
                        <Button variant="outlined" color="secondary" onClick={onLogout}>
                            Logout
                        </Button>
                    </Box>
                    {creatingProject ? (
                        <ProjectCreationForm onCreate={handleProjectCreation} onCancel={() => setCreatingProject(false)} />
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
                                            <Button size="small" color="primary" onClick={() => handleOpenProject(project.id)}>
                                                Open Project
                                            </Button>
                                            <Button size="small" color="secondary" onClick={() => openDeleteConfirmation(project.id)}>
                                                Delete
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
                    {/* Delete Confirmation Dialog */}
                    <Dialog open={openDeleteDialog} onClose={handleCancelDeletion}>
                        <DialogTitle>Delete Project</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this project? This action cannot be undone.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelDeletion} color="primary">Cancel</Button>
                            <Button onClick={handleDeleteProject} color="secondary">Delete</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}

        </Container>
    );
};

export default Dashboard;
