import React, { useState } from 'react';
import { signInWithGoogle } from './firebase-config';
import LoginScreen from './components/Login';
import OnboardingScreen from './components/Onboarding';
import Dashboard from './components/Dashboard';
import { User } from './model/User'; // Assuming User is your user model

// Define the type for userState
interface UserState {
    isNewUser: boolean;
    user: User;
}

function App() {
    // Use the UserState type and initialize as null
    const [userState, setUserState] = useState<UserState | null>(null);

    const handleSignIn = async () => {
        await signInWithGoogle(setUserState);
    };

    if (!userState) {
        return <LoginScreen onSignIn={handleSignIn} />;
    }

    // Access userState properties without TypeScript errors
    return userState.isNewUser ? (
        <OnboardingScreen user={userState.user} />
    ) : (
        <Dashboard user={userState.user} />
    );
}

export default App;
