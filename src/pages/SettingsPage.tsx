// src/pages/SettingsPage.tsx

import React, { useState } from 'react';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    FormGroup,
    Divider,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    GitHub as GitHubIcon,
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

function SettingsPage() {
    // State variables
    const [email, setEmail] = useState('ian@example.com');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [theme, setTheme] = useState('light');
    const [privacySettings, setPrivacySettings] = useState({
        showEmail: true,
        showProfile: true,
    });
    const [integrations, setIntegrations] = useState({
        github: false,
        slack: false,
    });

    // Handlers
    const handleSaveAccountSettings = () => {
        // Implement save logic here
        console.log('Account settings saved');
    };

    const handleSaveNotificationSettings = () => {
        // Implement save logic here
        console.log('Notification settings saved');
    };

    const handleSavePrivacySettings = () => {
        // Implement save logic here
        console.log('Privacy settings saved');
    };

    const handleToggleIntegration = (service: string) => {
        setIntegrations({
            ...integrations,
            [service]: !integrations[service as keyof typeof integrations],
        });
    };

    return (
        <div style={{ padding: 16 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <Grid container spacing={4}>
                {/* Account Settings */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader
                            avatar={<AccountCircleIcon />}
                            title="Account Settings"
                            subheader="Update your account information"
                        />
                        <CardContent>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveAccountSettings}
                                    style={{ marginTop: 16 }}
                                >
                                    Save Account Settings
                                </Button>
                            </FormGroup>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Notification Preferences */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader
                            avatar={<NotificationsIcon />}
                            title="Notification Preferences"
                            subheader="Manage your notifications"
                        />
                        <CardContent>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={notificationsEnabled}
                                            onChange={(e) => setNotificationsEnabled(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Enable Email Notifications"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveNotificationSettings}
                                    style={{ marginTop: 16 }}
                                >
                                    Save Notification Settings
                                </Button>
                            </FormGroup>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Theme Selection */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader
                            avatar={<AccountCircleIcon />}
                            title="Theme Selection"
                            subheader="Choose your preferred theme"
                        />
                        <CardContent>
                            <FormControl fullWidth>
                                <InputLabel id="theme-select-label">Theme</InputLabel>
                                <Select
                                    labelId="theme-select-label"
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value as string)}
                                >
                                    <MenuItem value="light">Light</MenuItem>
                                    <MenuItem value="dark">Dark</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => console.log('Theme changed to:', theme)}
                                style={{ marginTop: 16 }}
                            >
                                Save Theme Settings
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Privacy Settings */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader
                            avatar={<AccountCircleIcon />}
                            title="Privacy Settings"
                            subheader="Control your privacy options"
                        />
                        <CardContent>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={privacySettings.showEmail}
                                            onChange={(e) =>
                                                setPrivacySettings({
                                                    ...privacySettings,
                                                    showEmail: e.target.checked,
                                                })
                                            }
                                        />
                                    }
                                    label="Show Email on Profile"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={privacySettings.showProfile}
                                            onChange={(e) =>
                                                setPrivacySettings({
                                                    ...privacySettings,
                                                    showProfile: e.target.checked,
                                                })
                                            }
                                        />
                                    }
                                    label="Make Profile Public"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSavePrivacySettings}
                                    style={{ marginTop: 16 }}
                                >
                                    Save Privacy Settings
                                </Button>
                            </FormGroup>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Integrations */}
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            avatar={<GitHubIcon />}
                            title="Integrations"
                            subheader="Connect with third-party services"
                        />
                        <CardContent>
                            <List>
                                {/* GitHub Integration */}
                                <ListItem>
                                    <ListItemText
                                        primary="GitHub"
                                        secondary="Connect your GitHub account to sync repositories."
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            checked={integrations.github}
                                            onChange={() => handleToggleIntegration('github')}
                                            color="primary"
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                                {/* Slack Integration */}
                                <ListItem>
                                    <ListItemText primary="Slack" secondary="Receive notifications in Slack." />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            checked={integrations.slack}
                                            onChange={() => handleToggleIntegration('slack')}
                                            color="primary"
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default SettingsPage;
