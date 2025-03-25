import React from 'react';
import {Box, Chip, Divider, Typography} from "@mui/material";

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const mainBoxStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    borderRadius: "10px"
}

const textBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5
}

const TaskBox = ({task}) => {
    const startDate = new Date(task.deadline);
    const formattedStartDate = startDate.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
    }) + ', ' + startDate.getFullYear();

    const InfoItem = ({icon: Icon, text}) => (
        <Typography noWrap variant="body2" sx={textBoxStyle}>
            <Icon sx={{fontSize: 18}} color="primary"/>
            {text}
        </Typography>
    )

    return (
        <Box sx={mainBoxStyle}>
            <Typography noWrap variant="subtitle1" sx={textBoxStyle}>
                <TaskAltIcon fontSize="small" color="secondary"/>
                {task.name}
            </Typography>
            <Divider sx={{marginBottom: "5px"}}/>
            <Box sx={{ml: -0.25}}>
                <Chip
                    sx={{ml: -0.25, backgroundColor: task.isDone ? "success.main" : "default"}}
                    label={task.isDone ? "Done" : "To-Do"}
                    size="small"
                />
                <InfoItem icon={CalendarMonthIcon} text={formattedStartDate}/>
                <InfoItem icon={AccountCircleIcon} text={`${task.creator.first_name} ${task.creator.last_name}`}/>
            </Box>
        </Box>
    );
};

export default TaskBox;