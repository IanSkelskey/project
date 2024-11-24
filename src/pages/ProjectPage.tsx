// src/pages/ReportsPage.tsx
import ProjectDataGrid from '../components/ProjectDataGrid';
import { Project } from '../model/Project';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';

interface ProjectPageProps {
    project: Project;
}

const useStyles = makeStyles({
    fab: {
        position: 'fixed',
        bottom: 16,
        right: 16,
    },
});

function ProjectPage({ project }: ProjectPageProps) {
    const classes = useStyles();

    return (
        <>
            <ProjectDataGrid project={project} />
            <Fab color="primary" aria-label="add" className={classes.fab} style={{ bottom: 72, right: 32, transform: 'scale(0.8)' }} title="Add Task">
                <AddIcon />
            </Fab>
        </>
    );
}

export default ProjectPage;