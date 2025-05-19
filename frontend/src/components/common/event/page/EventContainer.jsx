import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import EventView from "./EventView";
import EventService from "../../../../services/base/ext/EventService";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "../../../layouts/Loading";
import {useError} from "../../../../contexts/ErrorContext";

const EventContainer = () => {
    const {id} = useParams();
    const {showError} = useError()

    const navigate = useNavigate();
    const myId = Cookies.get('userId');

    const [event, setEvent] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getEvent(id);
                setEvent(response);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


    const handleUpdate = async (updatedEvent) => {
        setLoading(true);
        setError(null);
        try {
            const response = await EventService.updateEvent(id, updatedEvent);
            setEvent(response);
        } catch (error) {
            showError(error)
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await EventService.deleteEvent(id);
            navigate('/events');
        } catch (error) {
            showError(error)
        } finally {
            setLoading(false);
        }
    };

    const handleUserLeaveFromEvent = async () => {
        setLoading(true);
        setError(null);
        try {
            await EventService.deleteUserFromEvent(id, myId);
            navigate('/events');
        } catch (error) {
            showError(error)
        } finally {
            setLoading(false);
        }
    }

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
            handleUserLeaveFromEvent={handleUserLeaveFromEvent}
        />
    );
};


export default EventContainer;