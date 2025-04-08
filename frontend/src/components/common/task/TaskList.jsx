import React from 'react';
import {Box, Grid} from "@mui/material";
import TaskBox from "./TaskBox";
import {useNavigate} from "react-router-dom";

const TaskList = ({tasks}) => {
    const navigate = useNavigate();
    return (
        //Todo: deprecated + size
        <Grid container spacing={1.5}>
            {tasks.map(task => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={task.id}>
                    <Box onClick={() => navigate(`${task.id}`)}>
                        <TaskBox task={task}/>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default TaskList;