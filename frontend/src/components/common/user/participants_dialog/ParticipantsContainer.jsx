import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import ParticipantsDialog from "./ParticipantsDialog";
import UserService from "../../../../services/ext/UserService";
import Loading from "../../../layouts/Loading";

const ParticipantsContainer = () => {
    const [users, setUsers] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //TODO: get from event
                const response = await UserService.getAllUsers(
                    {
                        page: page,
                    }
                );
                setUsers(response.data);
                setPagesCount(response.pages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const handleRemove = async (userId) => {
        //TODO: delete from event
        await UserService.deleteUser(userId);
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
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
        />
    );
}

export default ParticipantsContainer;