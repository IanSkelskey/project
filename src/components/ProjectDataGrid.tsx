// src/components/ProjectDataGrid.tsx

import React, { useState } from 'react';
import {
	DataGridPro,
	GridActionsCellItem,
	GridColDef,
	GridRowId,
	GridRowModes,
	GridRowModesModel,
} from '@mui/x-data-grid-pro';
import { Project } from '../model/Project';
import PriorityChip from '../atoms/PriorityChip';
import StatusChip from '../atoms/StatusChip';
import ProjectDataGridRow from './ProjectDataGridRowDetail';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';

interface ProjectDataGridProps {
	project: Project;
}

const ProjectDataGrid: React.FC<ProjectDataGridProps> = ({ project }) => {
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel((prevModel) => ({
			...prevModel,
			[id]: { mode: GridRowModes.View },
		}));
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel((prevModel) => ({
			...prevModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		}));
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel((prevModel) => ({
			...prevModel,
			[id]: { mode: GridRowModes.Edit },
		}));
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		// Implement delete logic here
	};

	const columns: GridColDef[] = [
		{ field: 'title', headerName: 'Task Title', flex: 1 },
		{
			field: 'priority',
			headerName: 'Priority',
			flex: 1,
			editable: true,
			renderCell: (params) => { return <PriorityChip priority={params.value as string} />; }
		},
		{
			field: 'dueDate',
			headerName: 'Due Date',
			flex: 1,
			editable: true,
			type: 'date',
		},
		{
			field: 'status',
			headerName: 'Status',
			flex: 1,
			editable: true,
			renderCell: (params) => {
				return <StatusChip status={params.value as string} />;
			},
		},
		{ field: 'assignedTo', headerName: 'Assigned To', flex: 1, editable: true },
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			getActions: ({ id }) => {
			  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
	  
			  if (isInEditMode) {
				return [
				  <GridActionsCellItem
					icon={<Save />}
					label="Save"
					onClick={handleSaveClick(id)}
					color="primary"
				  />,
				  <GridActionsCellItem
					icon={<Cancel />}
					label="Cancel"
					onClick={handleCancelClick(id)}
					color="inherit"
				  />,
				];
			  }
	  
			  return [
				<GridActionsCellItem
				  icon={<Edit />}
				  label="Edit"
				  onClick={handleEditClick(id)}
				  color="inherit"
				/>,
				<GridActionsCellItem
				  icon={<Delete />}
				  label="Delete"
				  onClick={handleDeleteClick(id)}
				  color="inherit"
				/>,
			  ];
			},
		},
	];

	return (
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
	);
};

export default ProjectDataGrid;