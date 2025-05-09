import {Stack} from '@mui/material';
import InvitationBox from "./InvitationBox";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, {useEffect, useState} from 'react';
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import InvitationService from "../../../services/base/ext/InvitationService";

const InvitationsList = () => {
    const [invitations, setInvitations] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await InvitationService.getAllInvitations(
                    page
                ); console.log(response.data)
                setInvitations(response.data);
                setPagesCount(response.pages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const handleRejectInvitation = (invitationId) => {
        setInvitations(prev =>
            prev.filter(invitation => invitation.id !== invitationId)
        );
        console.log('reject ' + invitationId)
    }

    const handleAcceptInvitation = (invitationId) => {
        setInvitations(prev =>
            prev.filter(invitation => invitation.id !== invitationId)
        );
        console.log('accept ' + invitationId)
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
                    <InvitationBox
                        invitation={invitation}
                        handleRejectInvitation={handleRejectInvitation}
                        handleAcceptInvitation={handleAcceptInvitation}
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

export default InvitationsList