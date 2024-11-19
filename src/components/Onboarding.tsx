import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Container, Typography, Button } from '@mui/material';
import { User } from '../model/User';

const OnboardingScreen = ({ user }: { user: User }) => {
    const handleCompleteOnboarding = async () => {
        await setDoc(doc(db, 'User', user.id), {
            userId: user.id,
            displayName: user.displayName,
            email: user.email,
            createdAt: new Date(),
            projects: [],
        });
    };

    return (
        <Container>
            <Typography variant="h5">Welcome, {user.displayName}!</Typography>
            <Typography>Create your first project to get started.</Typography>
            <Button onClick={handleCompleteOnboarding}>Complete Setup</Button>
        </Container>
    );
};

export default OnboardingScreen;
