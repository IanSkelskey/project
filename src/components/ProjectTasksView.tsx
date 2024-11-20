import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Task } from '../model/Task';
import { getProjectTasks } from '../util/firestore';

interface ProjectTasksViewProps {
    projectId: string;
    onBack: () => void;
}

const ProjectTasksView: React.FC<ProjectTasksViewProps> = ({ projectId, onBack }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        // Fetch tasks associated with the project
        getProjectTasks(projectId).then((fetchedTasks) => {
            setTasks(fetchedTasks);
        });
    }, [projectId]);

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Button variant="contained" color="primary" onClick={onBack} style={{ marginBottom: '1rem' }}>
                Back to Projects
            </Button>
            <Typography variant="h4" gutterBottom>
                Project Tasks
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Assigned To</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.statusId?.id}</TableCell>
                                <TableCell>{task.assignedTo?.id}</TableCell>
                                <TableCell>{task.createdAt.toDate().toLocaleString()}</TableCell>
                                <TableCell>{task.updatedAt.toDate().toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ProjectTasksView;
