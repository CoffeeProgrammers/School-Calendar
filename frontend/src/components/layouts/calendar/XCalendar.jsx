import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '@schedule-x/theme-default/dist/index.css';
import {ScheduleXCalendar, useCalendarApp} from '@schedule-x/react';
import {createViewDay, createViewMonthGrid, createViewWeek} from '@schedule-x/calendar';
import {createCalendarControlsPlugin} from '@schedule-x/calendar-controls';
import CustomToolbar from './CustomToolBar';
import '../../../assets/css/calendar.css'
import {Box} from "@mui/material";
import Cookies from "js-cookie";

const mapEventToCalendarEvent = (event) => ({
    id: event.id,
    title: event.name,
    start: event.startDate.replace('T', ' ').slice(0, 16),
    end: event.endDate.replace('T', ' ').slice(0, 16),
});

const XCalendar = ({events, userId}) => {
    const navigate = useNavigate();

    const isMyUser = userId.toString() === Cookies.get('userId')
    const [calendarControls] = useState(() => createCalendarControlsPlugin());
    const [selectedDate, setSelectedDate] = useState(null);

    const calendarEvents = events.map(mapEventToCalendarEvent);

    const calendar = useCalendarApp({
        selectedDate: new Date().toISOString().slice(0, 10),
        views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
        events: calendarEvents,
        plugins: [calendarControls],
        callbacks: {
            onEventClick: isMyUser
                ? (evt) => {
                    navigate(`/events/${evt.id}`);
                }
                : undefined,
            onDateChange: ({ date }) => {
                setSelectedDate(date);
            }
        },

    });

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        calendarControls.setDate(newDate);
    };

    const goToPrevious = () => {
        const range = calendarControls.getRange();
        const startDate = new Date(range.start);
        const prevDate = new Date(startDate);
        prevDate.setDate(startDate.getDate() - 1);
        const formatted = prevDate.toISOString().split('T')[0];
        calendarControls.setDate(formatted);
        setSelectedDate(formatted);
    };

    const goToNext = () => {
        const range = calendarControls.getRange();
        const endDate = new Date(range.end);
        const nextDate = new Date(endDate);
        nextDate.setDate(endDate.getDate() + 1);
        const formatted = nextDate.toISOString().split('T')[0];
        calendarControls.setDate(formatted);
        setSelectedDate(formatted);
    };

    const goToToday = () => {
        const today = new Date();
        const formatted = today.toISOString().split('T')[0];
        calendarControls.setDate(formatted);
        setSelectedDate(formatted);
    };

    const changeView = (viewName) => {
        calendarControls.setView(viewName);
    };


    useEffect(() => {
        try {
            const date = calendarControls.getDate?.();
            if (date) setSelectedDate(date);
        } catch (err) {
            console.warn('getDate error:', err);
        }
    }, [calendar, calendarControls]);

    return (
        <Box>
            <CustomToolbar
                goToBack={goToPrevious}
                goToToday={goToToday}
                goToNext={goToNext}
                handleViewChange={changeView}
                date={selectedDate}
                onDateChange={handleDateChange}
            />

            <div style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}>
                <div className="sx-react-calendar-wrapper">
                    <ScheduleXCalendar calendarApp={calendar} />
                </div>
            </div>
        </Box>
    );
};

export default XCalendar;