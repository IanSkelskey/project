// src/components/ProjectDataGrid.tsx

import React from 'react';
import {
	DataGridPro,
	GridColDef,
} from '@mui/x-data-grid-pro';
import { Project } from '../model/Project';
import PriorityChip from '../atoms/PriorityChip';
import StatusChip from '../atoms/StatusChip';
import ProjectDataGridRow from './ProjectDataGridRow';

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
			renderCell: (params) => { return <PriorityChip priority={params.value as string} />; }
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
				return <StatusChip status={params.value as string} />;
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
				getDetailPanelContent={(params) => <ProjectDataGridRow params={params} />}
				getDetailPanelHeight={() => 'auto'}
			/>
		</div>
	);
};

export default ProjectDataGrid;