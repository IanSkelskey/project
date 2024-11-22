// src/pages/ReportsPage.tsx
import React from 'react';

interface ProjectPageProps {
  title: string;
}

function ProjectPage({ title }: ProjectPageProps) {
  return (
    <div>
      <h1>{title}</h1>
      {/* Add your reports content here */}
    </div>
  );
}

export default ProjectPage;
