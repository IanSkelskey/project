// src/pages/ReportsPage.tsx
import ProjectDataGrid from '../components/ProjectDataGrid';
import { Project } from '../model/Project';
interface ProjectPageProps {
    project: Project;
}

function ProjectPage({ project }: ProjectPageProps) {
    return (
        <div style={{ height: '93vh', width: '100%' }}>
            <ProjectDataGrid project={project} />
        </div>
    );
}

export default ProjectPage;
