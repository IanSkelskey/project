// src/components/ProjectDataGrid.tsx

import React from 'react';
import {
	DataGridPro,
	GridColDef,
	GridRowParams,
} from '@mui/x-data-grid-pro';
import { Project } from '../model/Project';
import { Task } from '../model/Task';
import {
	Box,
	Chip,
	Typography,
	Card,
	CardContent,
	Grid,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
} from '@mui/material';
import {
	AutoAwesome,
	Autorenew,
	Error,
	HourglassEmpty,
	CheckCircle,
	Description,
	Comment,
	PriorityHigh,
	Event,
	Person,
} from '@mui/icons-material';

interface ProjectDataGridProps {
	project: Project;
}

const ProjectDataGrid: React.FC<ProjectDataGridProps> = ({ project }) => {
	const columns: GridColDef[] = [
		{ field: 'title', headerName: 'Task Title', flex: 1 },
		{
			field: 'priority',
			headerName: 'Priority',
			flex: 1,
			renderCell: (params) => {
				let color: 'default' | 'primary' | 'success' | 'warning' | 'error' =
					'default';
				switch (params.value) {
					case 'High':
						color = 'error';
						break;
					case 'Medium':
						color = 'warning';
						break;
					case 'Low':
						color = 'success';
						break;
					default:
						color = 'default';
				}
				return <Chip label={params.value} color={color} />;
			},
		},
		{
			field: 'dueDate',
			headerName: 'Due Date',
			flex: 1,
			valueFormatter: (value) => {
				const date = value as Date;
				return date.toLocaleDateString();
			},
		},
		{
			field: 'status',
			headerName: 'Status',
			flex: 1,
			renderCell: (params) => {
				let color: 'default' | 'primary' | 'success' | 'warning' | 'error' =
					'default';
				let label = params.value;
				let icon = null;
				switch (params.value) {
					case 'New':
						color = 'default';
						icon = <AutoAwesome />;
						break;
					case 'Completed':
						color = 'success';
						icon = <CheckCircle />;
						break;
					case 'In Progress':
						color = 'primary';
						icon = <Autorenew />;
						break;
					case 'Pending':
						color = 'warning';
						icon = <HourglassEmpty />;
						break;
					case 'Overdue':
						color = 'error';
						icon = <Error />;
						break;
					default:
						color = 'default';
				}
				return (
					<Chip
						label={
							params.colDef.computedWidth &&
								params.colDef.computedWidth < 120
								? ''
								: label
						}
						color={color}
						icon={icon || undefined}
						sx={{ width: '100%' }}
					/>
				);
			},
		},
		{ field: 'assignedTo', headerName: 'Assigned To', flex: 1 },
	];

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<DataGridPro
				rows={project.tasks}
				columns={columns}
				getRowId={(row) => row.id}
				initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
				pagination
				pageSizeOptions={[10, 20, 30]}
				disableRowSelectionOnClick
				getDetailPanelContent={TaskDetailPanelContent}
				getDetailPanelHeight={() => 'auto'}
			/>
		</div>
	);
};

export default ProjectDataGrid;

// Detail panel content component
const TaskDetailPanelContent = (params: GridRowParams) => {
	const task = params.row as Task;

	return (
		<Box sx={{ padding: 2, backgroundColor: 'background.default' }}>
			<Card elevation={1} sx={{ borderRadius: 2 }}>
				<CardContent>
					<Grid container spacing={4}>
						{/* Left Column */}
						<Grid item xs={12} md={8}>
							{/* Description Section */}
							<Box display="flex" alignItems="center" mb={2}>
								<Description color="action" sx={{ mr: 1 }} />
								<Typography variant="h6">Description</Typography>
							</Box>
							<Typography variant="body1" paragraph>
								{task.description}
							</Typography>

							<Divider sx={{ my: 2 }} />

							{/* Comments Section */}
							<Box display="flex" alignItems="center" mb={2}>
								<Comment color="action" sx={{ mr: 1 }} />
								<Typography variant="h6">Comments</Typography>
							</Box>
							<Typography variant="body1">
								{task.comments || 'No comments'}
							</Typography>
						</Grid>

						{/* Right Column */}
						<Grid item xs={12} md={4}>
							{/* Task Details */}
							<Typography variant="h6" gutterBottom>
								Details
							</Typography>
							<List disablePadding>
								<ListItem disableGutters>
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: 'primary.main' }}>
											<PriorityHigh />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary="Priority"
										secondary={task.priority || 'N/A'}
									/>
								</ListItem>

								<ListItem disableGutters>
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: 'secondary.main' }}>
											<Event />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary="Due Date"
										secondary={
											task.dueDate
												? new Date(task.dueDate).toLocaleDateString()
												: 'N/A'
										}
									/>
								</ListItem>

								<ListItem disableGutters>
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: 'success.main' }}>
											<Person />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary="Assigned To"
										secondary={task.assignedTo || 'Unassigned'}
									/>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
};