import React from 'react';
import Box from "@mui/material/Box";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import {defaultButtonStyles, disagreeButtonStyles} from "../../../../../assets/styles";
import DateUtils from "../../../../../utils/DateUtils";
import TextUtils from "../../../../../utils/TextUtils";
import MessageIcon from '@mui/icons-material/Message';

const ReceivedInvitationListBox = ({ invitation, handleRejectInvitation, handleAcceptInvitation }) => {
    const formattedDate =
        DateUtils.formatDate(invitation.event.startDate)
        + "  ⭢  " +
        DateUtils.formatDate(invitation.event.endDate)

    const onReject = () => {
        handleRejectInvitation()
    }

    const onAccept = () => {
        handleAcceptInvitation()
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
                    title={TextUtils.getUserFullName(invitation.sender)}
                    subheader={DateUtils.formatDate(invitation.time)}
                    sx={{ paddingBottom: "0" }}
                />
                <CardContent sx={{ paddingTop: "10px" }}>
                    <Typography>
                        <i>You have been invited to
                            event {invitation.event.name} at {formattedDate}.</i>
                    </Typography>
                    {invitation.description && (
                        <>
                            <Box mt={1.5} sx={{display: 'flex', alignItems: 'top', gap: 0.5}}>
                                <Box mt={0.45}>
                                    <MessageIcon fontSize="small" color="secondary"/>
                                </Box>
                                <Typography >{invitation.description}</Typography>
                            </Box>
                        </>
                    )}

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

export default ReceivedInvitationListBox;