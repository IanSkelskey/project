// src/pages/ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Typography,
    Grid,
    Card,
    CardContent,
    IconButton,
    Chip,
    Button,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
} from '@mui/material';
import {
    LocationOn as LocationOnIcon,
    AccessTime as AccessTimeIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Folder as FolderIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Header = styled('div')(({ theme }) => ({
    position: 'relative',
    height: '300px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: `4px solid ${theme.palette.background.paper}`,
}));

const ContentContainer = styled('div')(({ theme }) => ({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: theme.spacing(2),
}));

function ProfilePage() {
    // User data for Ian Skelskey
    const user = {
        name: 'Ian Skelskey',
        profilePicture:
            'https://lh3.googleusercontent.com/a/ACg8ocKKJTLcHdOmT909SGSAXjjVqHW5DhoS2gk6G2SNVz_m3IhVa7bN=s576-c-no',
        backgroundImage:
            'https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Stock photo
        location: 'San Francisco, CA',
        workingHours: '9:00 AM - 5:00 PM',
        linkedIn: 'https://www.linkedin.com/in/ianskelskey/',
        github: 'https://github.com/IanSkelskey',
        email: 'ian@example.com', // Replace with your actual email
        phone: '+1 (555) 123-4567', // Replace with your actual phone number
        bio: `Software engineer with a passion for developing innovative programs. Experienced in technology and programming, especially in web development and cloud computing.`,
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Firebase', 'Cloud Computing'],
    };

    // State to hold public projects
    const [publicProjects, setPublicProjects] = useState([
        // Mock data for now
        {
            id: 1,
            name: 'Project Alpha',
            description: 'An open-source project for data visualization.',
            url: 'https://github.com/IanSkelskey/project-alpha',
        },
        {
            id: 2,
            name: 'React Components Library',
            description: 'A reusable components library for React applications.',
            url: 'https://github.com/IanSkelskey/react-components-library',
        },
        {
            id: 3,
            name: 'Node.js API Starter',
            description: 'A boilerplate for starting new Node.js API projects.',
            url: 'https://github.com/IanSkelskey/node-api-starter',
        },
    ]);

    useEffect(() => {
        fetch('https://api.github.com/users/IanSkelskey/repos')
            .then((response) => response.json())
            .then((data) => {
                const projects = data.map((repo: any) => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    url: repo.html_url,
                }));
                setPublicProjects(projects);
            })
            .catch((error) => console.error('Error fetching GitHub repos:', error));
    }, []);

    return (
        <div>
            {/* Profile Header */}
            <Header
                style={{
                    backgroundImage: `url(${user.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item>
                        <ProfileAvatar alt={user.name} src={user.profilePicture} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" align="center" gutterBottom>
                            {user.name}
                        </Typography>
                        <Grid container spacing={1} alignItems="center" justifyContent="center">
                            <Grid item>
                                <LocationOnIcon />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">{user.location}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Header>

            {/* Main Content */}
            <ContentContainer>
                <Grid container spacing={4}>
                    {/* Left Column */}
                    <Grid item xs={12} md={8}>
                        {/* Bio Section */}
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    About Me
                                </Typography>
                                <Typography variant="body1">{user.bio}</Typography>
                            </CardContent>
                        </Card>

                        {/* Skills Section */}
                        <Card style={{ marginTop: 16 }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Skills
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {user.skills.map((skill, index) => (
                                        <Chip key={index} label={skill} style={{ marginTop: 8 }} />
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Public Projects Section */}
                        <Card style={{ marginTop: 16 }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Public Projects
                                </Typography>
                                <List>
                                    {publicProjects.map((project) => (
                                        <ListItem
                                            key={project.id}
                                            component="a"
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FolderIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={project.name} secondary={project.description} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} md={4}>
                        {/* Contact Information */}
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Contact Information
                                </Typography>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <EmailIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">{user.email}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="center" style={{ marginTop: 8 }}>
                                    <Grid item>
                                        <PhoneIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">{user.phone}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="center" style={{ marginTop: 8 }}>
                                    <Grid item>
                                        <AccessTimeIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">{user.workingHours}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardContent>
                                {/* Social Media Links */}
                                <Typography variant="h6" gutterBottom>
                                    Connect
                                </Typography>
                                <IconButton
                                    component="a"
                                    href={user.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <LinkedInIcon fontSize="large" />
                                </IconButton>
                                <IconButton
                                    component="a"
                                    href={user.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <GitHubIcon fontSize="large" />
                                </IconButton>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <Card style={{ marginTop: 16 }}>
                            <CardContent>
                                <Button variant="contained" color="primary" fullWidth>
                                    Edit Profile
                                </Button>
                                <Button variant="outlined" color="primary" fullWidth style={{ marginTop: 8 }}>
                                    Settings
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </ContentContainer>
        </div>
    );
}

export default ProfilePage;
