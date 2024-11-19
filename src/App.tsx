// src/App.tsx
import React from 'react';
import './App.css';

const App: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
            }}
        >
            <h1>Project</h1>
        </div>
    );
};

export default App;
