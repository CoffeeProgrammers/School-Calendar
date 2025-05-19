import React, {useEffect, useState} from 'react';
import InvitationService from "../../../../../services/base/ext/InvitationService";
import Loading from "../../../../layouts/Loading";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import PaginationBox from "../../../../layouts/lists/PaginationBox";
import SentInvitationListBox from "./SentInvitationListBox";
import {useError} from "../../../../../contexts/ErrorContext";


const SentInvitationsList = () => {
    const {showError} = useError()

    const [invitations, setInvitations] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await InvitationService.getMySentInvitations(
                    page - 1,
                    10
                );
                console.log(response)

                setInvitations(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);


    const handleEditInvitation = async (invitationId, description) => {
        try {
            const response = await InvitationService.updateInvitation(invitationId, {description});

            setInvitations(prevInvitations =>
                prevInvitations.map(invitation =>
                    invitation.id === invitationId ? {...invitation, ...response} : invitation
                )
            );

        } catch (error) {
            showError(error);
            console.error("Error updating invitation:", error);
        }
    };


    const handleDeleteInvitation = async (invitationId) => {
        try {
            await InvitationService.deleteInvitation(invitationId);

            setInvitations(prevInvitations =>
                prevInvitations.filter(invitation => invitation.id !== invitationId)
            );

        } catch (error) {
            showError(error);
            console.error("Error deleting invitation:", error);
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Stack spacing={1} mt={-1}>
                {invitations.map(invitation => (
                    <SentInvitationListBox
                        key={invitation.id}
                        invitation={invitation}
                        handleEditInvitation={
                            (description) => handleEditInvitation(invitation.id, description)
                        }
                        handleDeleteInvitation={
                            () => handleDeleteInvitation(invitation.id)
                        }
                    />
                ))}
            </Stack>
            {pagesCount > 1 && (
                <Box sx={{marginTop: "auto"}}>
                    <PaginationBox
                        page={page}
                        pagesCount={pagesCount}
                        setPage={setPage}
                    />
                </Box>
            )}
        </>
    )
};

export default SentInvitationsList;