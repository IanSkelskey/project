// src/components/Main.tsx
import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Import Grid2 from Material-UI unstable
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';

interface MainScreenProps {
    onLogout: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onLogout }) => {
    return (
        <Container
            maxWidth="xl" // Full width for large screens
            style={{
                paddingTop: '32px',
                paddingBottom: '32px',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '24px' }}>
                Project Manager Kanban Board
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    padding: '16px',
                }}
            >
                <Grid container spacing={2} sx={{ flexWrap: 'nowrap'}}>
                    <Grid container sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
                        <KanbanColumn title="Backlog">
                            <TaskCard title="Task 1" description="Description of task 1" />
                            <TaskCard title="Task 2" description="Description of task 2" />
                        </KanbanColumn>
                    </Grid>
                    <Grid container sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
                        <KanbanColumn title="Doing">
                            <TaskCard title="Task 3" description="Description of task 3" />
                        </KanbanColumn>
                    </Grid>
                    <Grid container sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
                        <KanbanColumn title="Review">
                            <TaskCard title="Task 4" description="Description of task 4" />
                        </KanbanColumn>
                    </Grid>
                    <Grid container sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
                        <KanbanColumn title="Done">
                            <TaskCard title="Task 5" description="Description of task 5" />
                        </KanbanColumn>
                    </Grid>
                </Grid>
            </Box>
            <Button
                variant="outlined"
                color="secondary"
                onClick={onLogout}
                size="large"
                style={{ marginTop: '16px', alignSelf: 'center' }}
            >
                Logout
            </Button>
        </Container>
    );
};

export default MainScreen;
