// src/pages/DashboardPage.tsx
import {
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    LinearProgress,
    Card,
    CardContent,
} from '@mui/material';
import { Assignment as AssignmentIcon, Build as BuildIcon } from '@mui/icons-material';
import { LineChart } from '@mui/x-charts/LineChart';

function DashboardPage() {
    // Sample data
    const upcomingTasks = [
        { id: 1, title: 'Design UI Mockups', dueDate: '2023-10-15' },
        { id: 2, title: 'Implement Authentication', dueDate: '2023-10-20' },
        { id: 3, title: 'Set Up Database', dueDate: '2023-10-25' },
    ];

    const milestones = [
        { id: 1, title: 'Project Kickoff', progress: 100 },
        { id: 2, title: 'Phase 1 Completion', progress: 70 },
        { id: 3, title: 'Beta Release', progress: 40 },
    ];

    const projectStats = [
        { label: 'Total Tasks', value: 120 },
        { label: 'Completed Tasks', value: 80 },
        { label: 'Open Issues', value: 15 },
    ];

    const recentActivities = [
        {
            id: 1,
            user: 'Alice',
            action: 'completed task',
            task: 'Design Logo',
            time: '2 hours ago',
        },
        {
            id: 2,
            user: 'Bob',
            action: 'commented on task',
            task: 'Fix Login Bug',
            time: '5 hours ago',
        },
        {
            id: 3,
            user: 'Charlie',
            action: 'updated milestone',
            task: 'Phase 1 Completion',
            time: '1 day ago',
        },
    ];

    // Sample data for contributions over time
    const contributionsData = [
        { date: new Date('2023-09-01'), contributions: 2 },
        { date: new Date('2023-09-02'), contributions: 5 },
        { date: new Date('2023-09-03'), contributions: 3 },
        { date: new Date('2023-09-04'), contributions: 7 },
        { date: new Date('2023-09-05'), contributions: 4 },
        { date: new Date('2023-09-06'), contributions: 6 },
        { date: new Date('2023-09-07'), contributions: 5 },
        // Add more data points as needed
    ];

    return (
        <div style={{ padding: 16 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Upcoming Tasks */}
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: 16 }}>
                        <Typography variant="h6" gutterBottom>
                            Upcoming Tasks
                        </Typography>
                        <List>
                            {upcomingTasks.map((task) => (
                                <ListItem key={task.id}>
                                    <AssignmentIcon style={{ marginRight: 16 }} />
                                    <ListItemText primary={task.title} secondary={`Due Date: ${task.dueDate}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Progress Towards Milestones */}
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: 16 }}>
                        <Typography variant="h6" gutterBottom>
                            Milestones Progress
                        </Typography>
                        {milestones.map((milestone) => (
                            <div key={milestone.id} style={{ marginBottom: 16 }}>
                                <Typography variant="subtitle1">{milestone.title}</Typography>
                                <LinearProgress variant="determinate" value={milestone.progress} />
                            </div>
                        ))}
                    </Paper>
                </Grid>

                {/* Project Statistics */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Project Statistics</Typography>
                            <List>
                                {projectStats.map((stat, index) => (
                                    <ListItem key={index}>
                                        <BuildIcon style={{ marginRight: 16 }} />
                                        <ListItemText primary={stat.label} secondary={stat.value} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Activities */}
                <Grid item xs={12} md={8}>
                    <Paper style={{ padding: 16 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Activity
                        </Typography>
                        <List>
                            {recentActivities.map((activity) => (
                                <ListItem key={activity.id}>
                                    <ListItemText
                                        primary={`${activity.user} ${activity.action} "${activity.task}"`}
                                        secondary={activity.time}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Contributions Over Time Chart */}
                <Grid item xs={12}>
                    <Paper style={{ padding: 16 }}>
                        <Typography variant="h6" gutterBottom>
                            Contributions Over Time
                        </Typography>
                        <div style={{ height: 300 }}>
                            <LineChart
                                dataset={contributionsData}
                                xAxis={[
                                    {
                                        dataKey: 'date',
                                        scaleType: 'time',
                                        valueFormatter: (value) => new Date(value).toLocaleDateString(),
                                    },
                                ]}
                                series={[
                                    {
                                        dataKey: 'contributions',
                                        label: 'Contributions',
                                        area: false,
                                    },
                                ]}
                                height={300}
                                margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default DashboardPage;
