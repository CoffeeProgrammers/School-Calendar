import React, {useEffect, useState} from 'react';
import Loading from "../../layouts/Loading";
import {Typography} from "@mui/material";
import EventView from "./EventView";
import EventService from "../../../services/base/ext/EventService";

const EventContainer = ({eventId}) => {
    const [event, setEvent] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getEventById(eventId);
                setEvent(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId]);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <EventView event={event}/>
    );
};


export default EventContainer;