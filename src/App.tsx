// src/App.tsx
import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from './firebase-config';
import './App.css';
import { Container, Typography, Button, Box } from '@mui/material';

const App: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false); // State to track if the user is logged in

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('User signed in:', user.displayName, user.email);
            setLoggedIn(true); // Update state to logged in after successful sign-in
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            setLoggedIn(false); // Update state to logged out
            console.log('User signed out');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

    // Render the login screen if not logged in
    if (!loggedIn) {
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
                    onClick={handleSignIn} 
                    size="large"
                >
                    Sign in with Google
                </Button>
            </Container>
        );
    }

    // Render the main content screen with a logout button if logged in
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
                onClick={handleLogout} 
                size="large"
                style={{ marginTop: '20px' }} // Adds some spacing above the button
            >
                Logout
            </Button>
        </Container>
    );
};

export default App;
