import React from 'react';
import {Box, Grid2} from "@mui/material";
import TaskBox from "./TaskBox";
import {useNavigate} from "react-router-dom";

const TaskList = ({tasks}) => {
    const navigate = useNavigate();
    return (
        //Todo: list optimize
        <Grid2 container spacing={1.5}>
            {tasks.map(task => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2.4}} key={task.id}>
                    <Box onClick={() => navigate(`${task.id}`)}>
                        <TaskBox task={task}/>
                    </Box>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default TaskList;