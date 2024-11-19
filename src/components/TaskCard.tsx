// src/components/TaskCard.tsx
import React from 'react';
import { Paper, Typography } from '@mui/material';

interface TaskCardProps {
    title: string;
    description: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description }) => {
    return (
        <Paper elevation={1} style={{ padding: '16px', backgroundColor: '#ffffff' }}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {description}
            </Typography>
        </Paper>
    );
};

export default TaskCard;
