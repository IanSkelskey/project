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
      <div style={{ padding: '16px' }}>{children}</div>
    </DashboardLayout>
  );
}

export default Toolpad;
