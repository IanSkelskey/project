// src/App.tsx
import React from 'react';
import { auth, provider, signInWithPopup } from './firebase-config';
import './App.css';
import { Container, Typography, Button, Box } from '@mui/material'; // Import additional Material-UI components

const App: React.FC = () => {
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('User signed in:', user.displayName, user.email);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <Container 
            maxWidth="sm" // Limits the width to small size for a compact design
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
                onClick={handleSignIn} 
                size="large"
            >
                Sign in with Google
            </Button>
        </Container>
    );
};

export default App;
