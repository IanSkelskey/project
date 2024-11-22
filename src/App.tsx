// src/App.tsx
import React from 'react';
import logo from './logo.svg';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { createTheme } from '@mui/material/styles';
import { useMediaQuery, CssBaseline } from '@mui/material';
import Toolpad from './components/Toolpad';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Assignment, Park, Settings } from '@mui/icons-material';
import { evergreen, project_manager } from './data/Projects';


function App() {
    // Detect dark mode preference
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Create theme based on preference
    const theme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
        },
    });

    // Define navigation structure
    const navigation: Navigation = [
        {
            kind: 'header',
            title: 'Main',
        },
        {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <DashboardIcon />,
        },
        {
            segment: 'projects',
            title: 'Projects',
            icon: <Assignment />,
            children: [
                {
                    segment: 'evergreen',
                    title: 'Evergreen',
                    icon: <Park />,
                },
                {
                    segment: 'project-manager',
                    title: 'Project Manager',
                    icon: <Assignment />,
                },
            ],
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Settings',
        },
        {
            segment: 'profile',
            title: 'Profile',
            icon: <PersonIcon />,
        },
        {
            segment: 'settings',
            title: 'Settings',
            icon: <Settings />,
        }
    ];

    // Router implementation
    const [pathname, setPathname] = React.useState('/dashboard');

    const router: Router = {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string | URL) => {
            setPathname(String(path));
        },
    };

    // Render the appropriate page based on the current route
    const renderPage = () => {
        switch (pathname) {
            case '/dashboard':
                return <DashboardPage />;
            case '/projects/evergreen':
                return <ProjectPage project={evergreen} />;
            case '/projects/project-manager':
                return <ProjectPage project={project_manager} />;
            case '/profile':
                return <ProfilePage />;
            case '/settings':
                return <div>Settings</div>;
            default:
                return <DashboardPage />;
        }
    };

    return (
        <AppProvider
            navigation={navigation}
            branding={{
                logo: <img src={logo} alt="logo" height={40} />,
                title: 'Open Project',
            }}
            router={router}
            theme={theme}
        >
            <CssBaseline />
            <Toolpad>{renderPage()}</Toolpad>
        </AppProvider>
    );
}

export default App;
