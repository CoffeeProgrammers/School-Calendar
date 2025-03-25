import React from 'react';
import {Grid} from "@mui/material";
import TaskBox from "./TaskBox";

const TaskList = ({tasks}) => {
    return (
        //Todo: deprecated + size
        <Grid container spacing={1.5}>
            {tasks.map(task => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={task.id}>
                    <TaskBox task={task}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default TaskList;