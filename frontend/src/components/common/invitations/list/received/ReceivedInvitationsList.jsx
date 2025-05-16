import {Stack} from '@mui/material';
import ReceivedInvitationListBox from "./ReceivedInvitationListBox";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, {useEffect, useState} from 'react';
import Loading from "../../../../layouts/Loading";
import PaginationBox from "../../../../layouts/lists/PaginationBox";
import InvitationService from "../../../../../services/base/ext/InvitationService";

const ReceivedInvitationsList = () => {
    const [invitations, setInvitations] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await InvitationService.getInvitations(
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

    const handleRejectInvitation = async (invitationId) => {
        try {
            await InvitationService.rejectInvitation(invitationId);
            setInvitations(prev =>
                prev.filter(invitation => invitation.id !== invitationId)
            );
        } catch (error) {
            console.error('Failed to reject invitation: ', error);
        }
    }

    const handleAcceptInvitation = async (invitationId) => {
        try {
            await InvitationService.acceptInvitation(invitationId);
            setInvitations(prev =>
                prev.filter(invitation => invitation.id !== invitationId)
            );
        } catch (error) {
            console.error('Failed to accept invitation: ', error);
        }
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Stack spacing={1} mt={-1}>
                {invitations.map(invitation => (
                    <ReceivedInvitationListBox
                        key={invitation.id}
                        invitation={invitation}
                        handleRejectInvitation={() => handleRejectInvitation(invitation.id)}
                        handleAcceptInvitation={() => handleAcceptInvitation(invitation.id)}
                    />
                ))}
            </Stack>
            {pagesCount > 1 && (
                <Box sx={{ marginTop: "auto" }}>
                    <PaginationBox
                        page={page}
                        pagesCount={pagesCount}
                        setPage={setPage}
                    />
                </Box>
            )}
        </>
    )
}

export default ReceivedInvitationsList