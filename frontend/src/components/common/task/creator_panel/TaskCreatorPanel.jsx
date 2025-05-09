import React from 'react';
import {Box, Typography} from "@mui/material";
import EditTaskDialog from "./EditTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";

const TaskCreatorPanel = ({task}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',}}>
            <Typography variant="body1" color="primary">Creator panel</Typography>
            <Box sx={{display: 'flex'}}>
                <EditTaskDialog task={task}/>
                <DeleteTaskDialog taskId={task.id}/>
            </Box>
        </Box>
    );
};

export default TaskCreatorPanel;