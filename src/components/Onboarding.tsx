import { createUser } from '../firestore';
import { Container, Typography, Button } from '@mui/material';
import { User } from '../model/User';

const OnboardingScreen = ({ user }: { user: User }) => {
    const handleCompleteOnboarding = async () => {
        await createUser(user);
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
