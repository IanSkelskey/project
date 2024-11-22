// src/Toolpad.tsx
import React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

interface ToolpadProps {
  children: React.ReactNode;
}

function Toolpad({ children }: ToolpadProps) {
  return (
    <DashboardLayout>
      {/* Main content area */}
      <div style={{ height: '100%', overflow: 'auto' }}>{children}</div>
    </DashboardLayout>
  );
}

export default Toolpad;
