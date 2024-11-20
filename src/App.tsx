// Updated App.tsx
import React, { useState } from 'react';
import LoginScreen from './components/Login';
import OnboardingScreen from './components/Onboarding';
import Dashboard from './components/Dashboard';
import { User } from './model/User';
import { signInWithGoogle } from './firebase-config';

interface UserState {
    isNewUser: boolean;
    user: User;
}

function App() {
    const [userState, setUserState] = useState<UserState | null>(null);
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

    const handleSignIn = async () => {
        await signInWithGoogle(setUserState);
    };

    const handleOnboardingComplete = () => {
        setIsOnboardingComplete(true);
    };

    const handleLogout = () => {
        setUserState(null); // Clear user state on logout
        setIsOnboardingComplete(false);
    };

    if (!userState) {
        return <LoginScreen onSignIn={handleSignIn} />;
    }

    return userState.isNewUser && !isOnboardingComplete ? (
        <OnboardingScreen user={userState.user} onComplete={handleOnboardingComplete} />
    ) : (
        <Dashboard user={userState.user} onLogout={handleLogout} />
    );
}

export default App;
