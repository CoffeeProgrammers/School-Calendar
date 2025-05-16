import React, {useEffect, useState} from 'react';
import Loading from "../../../layouts/Loading";
import {Typography} from "@mui/material";
import EventView from "./EventView";
import EventService from "../../../../services/base/ext/EventService";
import {useNavigate} from "react-router-dom";

const EventContainer = ({eventId}) => {
    const navigate = useNavigate();
    
    const [event, setEvent] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getEvent(eventId);
                setEvent(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId]);


    const handleUpdate = async (updatedEvent) => {
        setLoading(true);
        setError(null);
        try {
            const response = await EventService.updateEvent(eventId, updatedEvent);
            setEvent(response);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId) => {
        setLoading(true);
        setError(null);
        try {
            await EventService.deleteEvent(eventId);
            navigate('/events');
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <EventView
            event={event}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
        />
    );
};


export default EventContainer;