import React from 'react';
import Chip from '@mui/material/Chip';

interface PriorityChipProps {
	priority: string;
}

const PriorityChip: React.FC<PriorityChipProps> = ({ priority }) => {
	let color: 'default' | 'primary' | 'success' | 'warning' | 'error' = 'default';

	switch (priority) {
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

	return <Chip label={priority} color={color} />;
};

export default PriorityChip;