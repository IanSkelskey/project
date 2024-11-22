// components/TaskRow.tsx

import React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { Task } from '../model/Task';

interface TaskRowProps {
    task: Task;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>
                <Chip
                    label={task.status}
                    color={
                        task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'primary' : 'default'
                    }
                />
            </TableCell>
            <TableCell>{task.assignedTo}</TableCell>
        </TableRow>
    );
};

export default TaskRow;
