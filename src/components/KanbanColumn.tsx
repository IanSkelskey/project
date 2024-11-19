// src/components/KanbanColumn.tsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface KanbanColumnProps {
    title: string;
    children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, children }) => {
    return (
        <Paper elevation={3} style={{ width: '100%', padding: '16px', backgroundColor: '#f7f7f7' }}>
            <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>
                {title}
            </Typography>
            <Box display="flex" flexDirection="column" gap="8px">
                {children}
            </Box>
        </Paper>
    );
};

export default KanbanColumn;
