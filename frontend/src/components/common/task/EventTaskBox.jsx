import React from 'react';
import TaskCheckbox from "./TaskCheckbox";
import {Typography} from "@mui/material";

const EventTaskBox = ({task}) => {
    return (
        <div>
            <TaskCheckbox/>
           <Typography>{task.name}</Typography>
        </div>
    );
};

export default EventTaskBox;