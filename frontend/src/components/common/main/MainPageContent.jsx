import React, {useEffect, useState} from 'react';
import EventService from "../../../services/base/ext/EventService";
import {useNavigate} from "react-router-dom";
import StyledCalendar from "../../layouts/calendar/StyledCalendar";
import Loading from "../../layouts/Loading";
import {Typography} from "@mui/material";

const MainPageContent = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([])

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getMyEventsBetween(
                    '1990-01-01T00:00:00',
                    '2050-01-01T00:00:00'
                );

                console.log("events:")
                console.log(response)

                setEvents(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <StyledCalendar events={events}/>
    );
};

export default MainPageContent;