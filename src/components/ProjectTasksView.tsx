import React, { useEffect, useState } from 'react';
import {
	Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, MenuItem, Select, IconButton
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Task } from '../model/Task';
import { Status } from '../model/Status';
import { getProjectTasks, createTask, getProjectStatuses, createStatus, updateStatus, getProjectRef, getStatusRef, getUserRef } from '../util/firestore';
import { Timestamp } from 'firebase/firestore';

interface ProjectTasksViewProps {
	projectId: string;
	onBack: () => void;
}

const ProjectTasksView: React.FC<ProjectTasksViewProps> = ({ projectId, onBack }) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [statuses, setStatuses] = useState<Status[]>([]);
	const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
	const [openEditStatusDialog, setOpenEditStatusDialog] = useState(false);
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [newTaskDescription, setNewTaskDescription] = useState('');
	const [selectedStatusId, setSelectedStatusId] = useState<string>('');
	const [newStatusName, setNewStatusName] = useState('');
	const [editingStatusId, setEditingStatusId] = useState<string | null>(null);

	useEffect(() => {
		getProjectTasks(projectId).then(setTasks);
		getProjectStatuses(projectId).then(setStatuses);
	}, [projectId]);

	const handleAddTask = async () => {
		const newTask: Task = {
			id: '', // Temporary id, will be replaced by Firestore
			title: newTaskTitle,
			description: newTaskDescription,
			statusId: getStatusRef(selectedStatusId),
			projectId: getProjectRef(projectId),
			assignedTo: getUserRef(''), // Assign to no one initially
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
			blockingTasks: [],
			blockedByTasks: [],
		};
		await createTask(newTask);
		setTasks([...tasks, { ...newTask, id: '' }]);
		setOpenAddTaskDialog(false);
		setNewTaskTitle('');
		setNewTaskDescription('');
		setSelectedStatusId('');
	};

	const handleAddStatus = async () => {
		await createStatus(newStatusName, getProjectRef(projectId));
		const updatedStatuses = await getProjectStatuses(projectId);
		setStatuses(updatedStatuses);
		setNewStatusName('');
	};

	const handleEditStatus = async () => {
		if (editingStatusId) {
			await updateStatus(editingStatusId, newStatusName);
			const updatedStatuses = await getProjectStatuses(projectId);
			setStatuses(updatedStatuses);
			setOpenEditStatusDialog(false);
			setNewStatusName('');
		}
	};

	const openEditStatus = (statusId: string, currentName: string) => {
		setEditingStatusId(statusId);
		setNewStatusName(currentName);
		setOpenEditStatusDialog(true);
	};

	return (
		<Container maxWidth="lg" style={{ marginTop: '2rem' }}>
			<Button variant="contained" color="primary" onClick={onBack} style={{ marginBottom: '1rem' }}>
				Back to Projects
			</Button>
			<Typography variant="h4" gutterBottom>
				Project Tasks
			</Typography>
			<Button variant="contained" color="primary" onClick={() => setOpenAddTaskDialog(true)} style={{ marginBottom: '1rem' }}>
				Add New Task
			</Button>
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
								<TableCell>
									{statuses.find((status) => status.id === task.statusId?.id)?.name || 'Unknown'}
								</TableCell>
								<TableCell>{task.assignedTo?.id}</TableCell>
								<TableCell>{task.createdAt.toDate().toLocaleString()}</TableCell>
								<TableCell>{task.updatedAt.toDate().toLocaleString()}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Status Management Section */}
			<Box mt={4}>
				<Typography variant="h5">Manage Statuses</Typography>
				<Box display="flex" gap={2} mt={2} mb={2}>
					<TextField
						label="New Status Name"
						value={newStatusName}
						onChange={(e) => setNewStatusName(e.target.value)}
					/>
					<Button variant="contained" onClick={handleAddStatus}>Add Status</Button>
				</Box>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Status Name</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{statuses.map((status) => (
								<TableRow key={status.id}>
									<TableCell>{status.name}</TableCell>
									<TableCell>
										<IconButton onClick={() => openEditStatus(status.id, status.name)}>
											<Edit />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

			{/* Add Task Dialog */}
			<Dialog open={openAddTaskDialog} onClose={() => setOpenAddTaskDialog(false)}>
				<DialogTitle>Add New Task</DialogTitle>
				<DialogContent>
					<Box display="flex" flexDirection="column" gap={2}>
						<TextField
							label="Task Title"
							value={newTaskTitle}
							onChange={(e) => setNewTaskTitle(e.target.value)}
							fullWidth
						/>
						<TextField
							label="Task Description"
							value={newTaskDescription}
							onChange={(e) => setNewTaskDescription(e.target.value)}
							fullWidth
							multiline
							rows={4}
						/>
						<Select
							label="Status"
							value={selectedStatusId}
							onChange={(e) => setSelectedStatusId(e.target.value as string)}
							fullWidth
						>
							{statuses.map((status) => (
								<MenuItem key={status.id} value={status.id}>
									{status.name}
								</MenuItem>
							))}
						</Select>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenAddTaskDialog(false)} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAddTask} color="primary">
						Add Task
					</Button>
				</DialogActions>
			</Dialog>

			{/* Edit Status Dialog */}
			<Dialog open={openEditStatusDialog} onClose={() => setOpenEditStatusDialog(false)}>
				<DialogTitle>Edit Status</DialogTitle>
				<DialogContent>
					<TextField
						label="Status Name"
						value={newStatusName}
						onChange={(e) => setNewStatusName(e.target.value)}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenEditStatusDialog(false)} color="primary">Cancel</Button>
					<Button onClick={handleEditStatus} color="primary">Save</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default ProjectTasksView;
