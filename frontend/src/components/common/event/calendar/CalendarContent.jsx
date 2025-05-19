import React, {useEffect, useState} from 'react';
import EventService from "../../../../services/base/ext/EventService";
import Loading from "../../../layouts/Loading";
import {Typography} from "@mui/material";
import XCalendar from "../../../layouts/calendar/XCalendar";

const CalendarContent = ({userId}) => {
    const [events, setEvents] = useState([])

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getUserEventsBetween(
                    userId,
                    '1990-01-01T00:00:00',
                    '2050-01-01T00:00:00'
                );

                console.log("events:")
                console.log(response)

                setEvents(response.now);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }
    return (
        <XCalendar events={events} userId={userId}/>
    );
};

export default CalendarContent;