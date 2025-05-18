import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Box, Divider, Typography} from "@mui/material";
import '../../../assets/css/calendar.css';
import TextUtils from "../../../utils/TextUtils";
import CustomToolbar from "./CustomToolBar";
import {listElementBoxTextStyle} from "../../../assets/styles";
import {SpaceDashboard} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SellIcon from '@mui/icons-material/Sell';

const localizer = momentLocalizer(moment);

const mapEventToCalendarEvent = (event) => ({
    id: event.id,
    title: event.name,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    resource: {
        type: event.type,
        creator: event.creator,
    },
});

const CustomEvent = ({event}) => (
    <Box>
        <Typography noWrap sx={{...listElementBoxTextStyle, fontSize: 15.25,}}>
            <SpaceDashboard sx={{fontSize: 16, mr: -0.3}} color="secondary"/>
            {event.title}
        </Typography>
        <Divider sx={{marginBottom: "3px"}}/>
        <Box>
            <Box sx={listElementBoxTextStyle}>
                <SellIcon sx={{fontSize: 15}} color="primary"/>
                <Typography noWrap variant="body2" >
                    {TextUtils.formatEnumText(event.resource.type)}
                </Typography>
            </Box>
            <Box sx={listElementBoxTextStyle}>
                <AccountCircleIcon sx={{fontSize: 15}} color="primary"/>
                <Typography noWrap variant="body2" >
                    {TextUtils.getUserFullName(event.resource.creator)}
                </Typography>
            </Box>


        </Box>
    </Box>
);

const StyledCalendar = ({events}) => {
    const calendarEvents = events.map(mapEventToCalendarEvent);

    return (
        <>
            <Box className="calendar-wrapper">
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    defaultView="month"
                    views={['month', 'week', 'day']}
                    components={{
                        event: CustomEvent,
                        toolbar: CustomToolbar
                    }}
                />
            </Box>
        </>
    );
};

export default StyledCalendar;