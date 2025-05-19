import React from 'react';
import {Box, Typography} from "@mui/material";
import UpdateTaskDialog from "./UpdateTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";

const TaskCreatorPanel = ({task, handleDelete, handleUpdate}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',}}>
            <Typography variant="body1" color="primary">Creator panel</Typography>
            <Box sx={{display: 'flex'}}>
                <UpdateTaskDialog task={task} handleUpdate={handleUpdate}/>
                <DeleteTaskDialog handleDelete={handleDelete}/>
            </Box>
        </Box>
    );
};

export default TaskCreatorPanel;