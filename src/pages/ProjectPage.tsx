// src/pages/ReportsPage.tsx
import ProjectTable from '../components/ProjectTable';
import TaskRow from '../components/TaskRow';
import { Project } from '../model/Project';
interface ProjectPageProps {
    project: Project;
}

function ProjectPage({ project }: ProjectPageProps) {
    return (
        <ProjectTable project={project}>
            {project.tasks.map((task) => (
                <TaskRow key={task.id} task={task} />
            ))}
        </ProjectTable>
    );
}

export default ProjectPage;
