import React from 'react';
import Chip from '@mui/material/Chip';
import { Circle, Square, Star } from '@mui/icons-material';

interface PriorityChipProps {
	priority: string;
}

const PriorityChip: React.FC<PriorityChipProps> = ({ priority }) => {
	let color: 'default' | 'primary' | 'success' | 'warning' | 'error' = 'default';
	let icon = null;

	switch (priority) {
		case 'High':
			color = 'error';
			icon = <Star />;
			break;
		case 'Medium':
			color = 'warning';
			icon = <Square />;
			break;
		case 'Low':
			color = 'success';
			icon = <Circle />;
			break;
		default:
			color = 'default';
	}

	return <Chip label={priority} color={color} icon={icon || undefined} />;
};

export default PriorityChip;