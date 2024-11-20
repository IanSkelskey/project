// src/components/ProjectCreationForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

interface ProjectCreationFormProps {
    onCreate: (projectName: string, description: string) => void;
    onCancel: () => void;
}

const ProjectCreationForm: React.FC<ProjectCreationFormProps> = ({ onCreate, onCancel }) => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (projectName.trim() && description.trim()) {
            onCreate(projectName, description);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Typography variant="h5" gutterBottom>Create New Project</Typography>
            <TextField
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Create Project
                </Button>
            </Box>
        </Container>
    );
};

export default ProjectCreationForm;
