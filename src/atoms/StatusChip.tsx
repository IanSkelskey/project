import React from 'react';
import Chip from '@mui/material/Chip';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Autorenew from '@mui/icons-material/Autorenew';
import HourglassEmpty from '@mui/icons-material/HourglassEmpty';
import Error from '@mui/icons-material/Error';

interface StatusChipProps {
	status: string;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
	let color: 'default' | 'primary' | 'success' | 'warning' | 'error' = 'default';
	let label = status;
	let icon = null;

	switch (status) {
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
			label={label}
			color={color}
			icon={icon || undefined}
		/>
	);
};

export default StatusChip;