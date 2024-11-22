// components/ProjectTable.tsx

import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { Project } from '../model/Project';

interface ProjectTableProps {
  project: Project;
  children: React.ReactNode; // TaskRow components
}

const ProjectTable: React.FC<ProjectTableProps> = ({ project, children }) => {
  return (
    <div style={{ width: '100%' }}>
      <TableContainer component={Paper} style={{ maxHeight: '93vh' }}>
        <Table stickyHeader aria-label={`${project.name} tasks table`}>
          <TableHead>
            <TableRow>
              <TableCell>Task Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectTable;
