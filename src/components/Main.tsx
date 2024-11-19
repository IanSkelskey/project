// src/components/Main.tsx
import React from 'react';
import { Container, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';

interface MainScreenProps {
	onLogout: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onLogout }) => {
	return (
		<Container maxWidth="lg" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
			<Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '24px' }}>
				Project Manager Kanban Board
			</Typography>
			<Grid container spacing={2}>
				<Grid container>
					<KanbanColumn title="Backlog">
						<TaskCard title="Task 1" description="Description of task 1" />
						<TaskCard title="Task 2" description="Description of task 2" />
					</KanbanColumn>
				</Grid>
				<Grid container>
					<KanbanColumn title="Doing">
						<TaskCard title="Task 3" description="Description of task 3" />
					</KanbanColumn>
				</Grid>
				<Grid container>
					<KanbanColumn title="Review">
						<TaskCard title="Task 4" description="Description of task 4" />
					</KanbanColumn>
				</Grid>
				<Grid container>
					<KanbanColumn title="Done">
						<TaskCard title="Task 5" description="Description of task 5" />
					</KanbanColumn>
				</Grid>
			</Grid>
			<Button
				variant="outlined"
				color="secondary"
				onClick={onLogout}
				size="large"
				style={{ marginTop: '32px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
			>
				Logout
			</Button>
		</Container>
	);
};

export default MainScreen;
