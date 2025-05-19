import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import Loading from "../../../layouts/Loading";
import EventInviteDialog from "./EventInviteDialog";
import UserService from "../../../../services/base/ext/UserService";
import InvitationService from "../../../../services/base/ext/InvitationService";
import {useError} from "../../../../contexts/ErrorContext";


const EventInviteContainer = ({eventId}) => {
    const {showError} = useError()

    const [users, setUsers] = useState([])

    const [searchFirstName, setSearchFirstName] = useState('');
    const [searchLastName, setSearchLastName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');

    const [role, setRole] = useState('');
    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPage(1);
    }, [searchFirstName, searchLastName, searchEmail, role]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserService.getUsersByNotEvent(
                    eventId,
                    page - 1,
                    15,
                    searchFirstName,
                    searchLastName,
                    searchEmail,
                    role
                );
                setUsers(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [role, page, eventId, searchFirstName, searchLastName, searchEmail]);


    const handleInvite = async (invitedUser, text) => {
        try {
            await InvitationService.createInvitation(eventId, invitedUser.id, {description: text});
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== invitedUser.id));
        } catch (error) {
            showError(error);
        }
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
            searchFirstName={searchFirstName}
            setSearchFirstName={setSearchFirstName}
            searchLastName={searchLastName}
            setSearchLastName={setSearchLastName}
            searchEmail={searchEmail}
            setSearchEmail={setSearchEmail}
            isOpenFilterMenu={isOpenFilterMenu}
            setOpenFilterMenu={setOpenFilterMenu}
            handleInvite={handleInvite}
        />
    );
};

export default EventInviteContainer;