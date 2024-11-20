import { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { User } from '../model/User';
import { createUser } from '../firestore';

interface OnboardingProps {
    user: User;
    onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingProps> = ({ user, onComplete }) => {
    const [displayName, setDisplayName] = useState(user.displayName || '');

    const handleConfirm = () => {
        // Here you might update the user object with the displayName
        // and then move to the dashboard or update user data
        const newUser = { ...user, displayName };
        createUser(newUser).then(() => {
            onComplete(); // Navigate to Dashboard component
        });
        onComplete(); // Navigate to Dashboard component
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Welcome, {user.displayName || 'User'}!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Set your display name and confirm your information to proceed.
            </Typography>
            <Box mt={3}>
                <TextField
                    label="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    fullWidth
                    style={{ marginTop: '1rem' }}
                >
                    Confirm and Continue
                </Button>
            </Box>
        </Container>
    );
};

export default OnboardingScreen;
