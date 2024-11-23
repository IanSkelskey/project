import React from 'react';
import { GridRowParams } from "@mui/x-data-grid";
import { Task } from "../model/Task";
import { Avatar, Box, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Comment, Description, Event, Person, PriorityHigh } from "@mui/icons-material";

interface ProjectDataGridRowProps {
    params: GridRowParams;
}

const ProjectDataGridRow: React.FC<ProjectDataGridRowProps> = ({ params }) => {
    const task = params.row as Task;

    return (
        <Box sx={{ padding: 2, backgroundColor: 'background.default' }}>
            <Card elevation={1} sx={{ borderRadius: 2 }}>
                <CardContent>
                    <Grid container spacing={4}>
                        {/* Left Column */}
                        <Grid>
                            {/* Description Section */}
                            <Box display="flex" alignItems="center" mb={2}>
                                <Description color="action" sx={{ mr: 1 }} />
                                <Typography variant="h6">Description</Typography>
                            </Box>
                            <Typography variant="body1" paragraph>
                                {task.description}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            {/* Comments Section */}
                            <Box display="flex" alignItems="center" mb={2}>
                                <Comment color="action" sx={{ mr: 1 }} />
                                <Typography variant="h6">Comments</Typography>
                            </Box>
                            <Typography variant="body1">
                                {task.comments || 'No comments'}
                            </Typography>
                        </Grid>

                        {/* Right Column */}
                        <Grid>
                            {/* Task Details */}
                            <Typography variant="h6" gutterBottom>
                                Details
                            </Typography>
                            <List disablePadding>
                                <ListItem disableGutters>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            <PriorityHigh />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Priority"
                                        secondary={task.priority || 'N/A'}
                                    />
                                </ListItem>

                                <ListItem disableGutters>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                            <Event />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Due Date"
                                        secondary={
                                            task.dueDate
                                                ? new Date(task.dueDate).toLocaleDateString()
                                                : 'N/A'
                                        }
                                    />
                                </ListItem>

                                <ListItem disableGutters>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'success.main' }}>
                                            <Person />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Assigned To"
                                        secondary={task.assignedTo || 'Unassigned'}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProjectDataGridRow;