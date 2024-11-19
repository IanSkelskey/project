// src/components/Login.tsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

interface LoginScreenProps {
    onSignIn: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSignIn }) => {
    return (
        <Container
            maxWidth="sm"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Box mb={3}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to Project Manager
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Organize your projects, manage tasks, and boost productivity.
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={onSignIn}
                size="large"
            >
                Sign in with Google
            </Button>
        </Container>
    );
};

export default LoginScreen;
