import React from 'react';
import {Box, Chip, Divider, Typography} from "@mui/material";

import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {SpaceDashboard} from "@mui/icons-material";
import {listElementBoxStyle, listElementBoxTextStyle} from "../../../../assets/styles";
import TextUtils from "../../../../utils/TextUtils";


const EventListBox = ({event}) => {
    const startDate = new Date(event.startDate);
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
                <Chip
                    sx={{ml: -0.25}}
                    label={TextUtils.formatEnumText(event.type)}
                    size="small"
                />
                <InfoItem icon={PlaceIcon} text={event.place}/>
                <InfoItem icon={CalendarMonthIcon} text={formattedStartDate}/>
                <InfoItem icon={AccountCircleIcon} text={TextUtils.getUserFullName(event.creator)}/>
            </Box>
        </Box>
    );
};

export default EventListBox;