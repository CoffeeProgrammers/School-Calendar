import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import ParticipantsDialog from "./ParticipantsDialog";
import UserService from "../../../../services/base/ext/UserService";
import Loading from "../../../layouts/Loading";
import EventService from "../../../../services/base/ext/EventService";

const ParticipantsContainer = ({eventId, isCreator}) => {
    const [users, setUsers] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //TODO: search & filters
                const response = await UserService.getUsersByEvent(
                    eventId,
                    page - 1,
                    10,
                );
                console.log("participants:")
                console.log(response)
                
                setUsers(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId, page]);

    const handleRemove = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            await EventService.deleteUserFromEvent(eventId, userId);
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Failed to remove user:", error);
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
        <ParticipantsDialog
            users={users}
            pagesCount={pagesCount}
            page={page}
            setPage={setPage}
            handleRemove={handleRemove}
            isCreator={isCreator}
            eventId={eventId}
        />
    );
}

export default ParticipantsContainer;