import React from 'react';
import Box from "@mui/material/Box";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { defaultButtonStyles, disagreeButtonStyles } from "../../../assets/styles";
import DateService from "../../../services/simple/DateService";

const InvitationBox = ({ invitation, handleRejectInvitation, handleAcceptInvitation }) => {
    const formattedDate =
        DateService.formatDateToMDT(invitation.event.start_date)
        + "  ⭢  " +
        DateService.formatDateToMDT(invitation.event.end_date)

    const onReject = () => {
        handleRejectInvitation(invitation.id)
    }

    const onAccept = () => {
        handleAcceptInvitation(invitation.id)
    }
    return (
        <Card variant='outlined' sx={{ borderRadius: "10px" }}>
            <Box mb={-2}>
                <CardHeader
                    slotProps={{
                        title: { sx: { fontSize: "18px" } },
                        subheader: { sx: { color: "gray" } }
                    }}
                    avatar={
                        <AccountCircleIcon sx={{ fontSize: "40px" }} color="secondary" />
                    }
                    //TODO TextUtils
                    title={invitation.creator.first_name + " " + invitation.creator.last_name}
                    subheader={DateService.formatDateToMDT(invitation.time)}
                    sx={{ paddingBottom: "0" }}
                />
                <CardContent sx={{ paddingTop: "10px" }}>
                    <Typography>
                        You have been invited to
                        event {invitation.event.name} at {formattedDate}.
                    </Typography>

                    <Typography mt={1.5}>{invitation.description}</Typography>

                    {invitation.warning && (
                        <Box mt={1} p={2} border={"2px solid #d11507"} borderRadius={"10px"}>
                            <Typography color={'#d11507'} fontWeight={'bold'}>Warning</Typography>
                            <Typography>{invitation.warning}</Typography>
                        </Box>
                    )}

                    <Box mt={1} sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                        <Button
                            onClick={onReject}
                            variant="contained"
                            sx={disagreeButtonStyles}
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={onAccept}
                            variant="contained"
                            sx={defaultButtonStyles}
                        >
                            Accept
                        </Button>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default InvitationBox;