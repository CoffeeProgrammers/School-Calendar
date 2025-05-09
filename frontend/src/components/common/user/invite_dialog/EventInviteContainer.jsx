import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import Loading from "../../../layouts/Loading";
import EventInviteDialog from "./EventInviteDialog";
import UserService from "../../../../services/base/ext/UserService";

const eventTypes = [
    {value: '', label: <em>None</em>},
    {value: 'teacher', label: 'Teacher'},
    {value: 'student', label: 'Student'},
    {value: 'parents', label: 'Parents'},

];

const EventInviteContainer = () => {
    const [users, setUsers] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const [role, setRole] = useState('');
    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserService.getAllUsers(
                    {
                        page: page,
                        searchQuery: searchQuery,
                        role: role
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
    }, [searchQuery, role, page]);

    //TODO: method invite
    const handleInvite =  (invitedUser) => {
        console.log("handleInvite " + invitedUser.first_name + " " + invitedUser.last_name);
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== invitedUser.id));
    }

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <EventInviteDialog
            role={role}
            setRole={setRole}
            users={users}
            pagesCount={pagesCount}
            page={page}
            setPage={setPage}
            eventTypes={eventTypes}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isOpenFilterMenu={isOpenFilterMenu}
            setOpenFilterMenu={setOpenFilterMenu}
            handleInvite={handleInvite}
        />
    );
};

export default EventInviteContainer;