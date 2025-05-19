import React from 'react';
import {Box, Chip, Divider, Typography} from "@mui/material";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {listElementBoxStyle, listElementBoxTextStyle} from "../../../assets/styles";
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextUtils from "../../../utils/TextUtils";

const TaskBox = ({task}) => {
    const startDate = new Date(task.deadline);
    const formattedStartDate = startDate.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
    }) + ', ' + startDate.getFullYear();

    const InfoItem = ({icon: Icon, text}) => (
        <Typography noWrap variant="body2" sx={listElementBoxTextStyle}>
            <Icon sx={{fontSize: 18}} color="primary"/>
            {text}
        </Typography>
    )

    return (
        <Box sx={{...listElementBoxStyle, maxWidth: "350px"}}>
            <Typography noWrap variant="subtitle1" sx={listElementBoxTextStyle}>
                <AssignmentIcon fontSize="small" color="secondary"/>
                {task.name}
            </Typography>
            <Divider sx={{marginBottom: "5px"}}/>
            <Box sx={{ml: -0.25}}>
                <Chip
                    sx={{ml: -0.25, backgroundColor: task.done ? "success.main" : "default"}}
                    label={task.done ? "done" : "to-do"}
                    size="small"
                />
                <InfoItem icon={CalendarMonthIcon} text={formattedStartDate}/>
                <InfoItem icon={AccountCircleIcon} text={TextUtils.getUserFullName(task.creator)}/>
            </Box>
        </Box>
    );
};

export default TaskBox;