import React from 'react';
import Page from "../../layouts/Page";
import TaskContainer from "../../common/task/task_page/TaskContainer";
import {Box, Divider, Typography} from "@mui/material";
import DeleteTaskDialog from "../../common/task/creator_panel/DeleteTaskDialog";
import EditTaskDialog from "../../common/task/creator_panel/EditTaskDialog";


const TaskPage = () => {
    return (
        <Page>
            <Box sx={{
                width: "850px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Typography variant="body1" color="primary">Creator panel</Typography>
                    <Box sx={{display: 'flex'}}>
                        <EditTaskDialog/>
                        <DeleteTaskDialog/>
                    </Box>
                </Box>
                <Divider sx={{width: '100%', mb: 0.5}}/>
                <TaskContainer/>
            </Box>
        </Page>
    );
};

export default TaskPage;