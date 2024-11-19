// src/App.tsx
import React from 'react';
import { auth, provider, signInWithPopup } from './firebase-config';
import './App.css';

const App: React.FC = () => {
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('User signed in:', user.displayName, user.email);
            // Additional user information is available in user object
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className="App">
            <h1>Project</h1>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default App;
