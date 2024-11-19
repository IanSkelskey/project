// src/App.tsx
import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from './firebase-config';
import './App.css';
import LoginScreen from './components/Login';
import MainScreen from './components/Main';

const App: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User signed in:', result.user?.displayName, result.user?.email);
            setLoggedIn(true);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                setLoggedIn(false);
                console.log('User signed out');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    return loggedIn ? (
        <MainScreen onLogout={handleLogout} />
    ) : (
        <LoginScreen onSignIn={handleSignIn} />
    );
};

export default App;
