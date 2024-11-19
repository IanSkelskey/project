// src/components/Main.tsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';

interface MainScreenProps {
    onLogout: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onLogout }) => {
    return (
        <Container
            maxWidth="md"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" component="h2" gutterBottom>
                Welcome Back to Project Manager!
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                Here you can start managing your tasks and organizing your projects.
            </Typography>
            <Button
                variant="outlined"
                color="secondary"
                onClick={onLogout}
                size="large"
                style={{ marginTop: '20px' }}
            >
                Logout
            </Button>
        </Container>
    );
};

export default MainScreen;
