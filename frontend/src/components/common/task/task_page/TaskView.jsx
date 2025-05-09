import React from 'react';
import {Box, Divider} from '@mui/material';
import TaskCreatorPanel from "../creator_panel/TaskCreatorPanel";
import TaskViewMainBox from "../TaskViewMainBox";

const TaskView = ({task}) => {
    return (
        <Box sx={{width: "850px", display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <TaskCreatorPanel task={task}/>

            <Divider sx={{width: '100%', mb: 0.5}}/>

            <TaskViewMainBox task={task}/>
        </Box>
    );
};

export default TaskView;