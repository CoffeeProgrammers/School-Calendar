import React from 'react';
import {Box, Chip, Divider, Typography} from "@mui/material";

import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {SpaceDashboard} from "@mui/icons-material";
import {listElementBoxStyle, listElementBoxTextStyle} from "../../../assets/styles";


const EventBox = ({event}) => {
    const startDate = new Date(event.start_date);
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
        <Box sx={listElementBoxStyle}>
            <Typography noWrap variant="subtitle1" sx={listElementBoxTextStyle}>
                <SpaceDashboard fontSize="small" color="secondary"/>
                {event.name}
            </Typography>
            <Divider sx={{marginBottom: "5px"}}/>
            <Box sx={{ml: -0.25}}>
                <Chip sx={{ml: -0.25}} label={event.type} size="small"/>
                <InfoItem icon={PlaceIcon} text={event.place}/>
                <InfoItem icon={CalendarMonthIcon} text={formattedStartDate}/>
                <InfoItem icon={AccountCircleIcon} text={`${event.creator.first_name} ${event.creator.last_name}`}/>
            </Box>
        </Box>
    );
};

export default EventBox;