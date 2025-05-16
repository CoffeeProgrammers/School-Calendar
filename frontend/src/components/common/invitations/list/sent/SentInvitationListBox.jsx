import React from 'react';
import Box from "@mui/material/Box";
import OutgoingMailIcon from "@mui/icons-material/OutgoingMail";
import Typography from "@mui/material/Typography";
import TextUtils from "../../../../../utils/TextUtils";
import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import SubjectIcon from "@mui/icons-material/Subject";
import DateUtils from "../../../../../utils/DateUtils";
import {Card, CardContent} from "@mui/material";
import SentInvitationActionMenu from "../../action_menu/SentInvitationActionMenu";

const SentInvitationListBox = ({invitation, handleEditInvitation, handleDeleteInvitation}) => {
    return (
        <Card variant='outlined' sx={{borderRadius: "10px", position: 'relative'}}>
            <Box sx={{position: 'absolute', top: 6, right: 6}}>
                <SentInvitationActionMenu
                    invitation={invitation}
                    handleEditInvitation={handleEditInvitation}
                    handleDeleteInvitation={handleDeleteInvitation}
                />
            </Box>
            <Box mb={-2}>
                <CardContent>
                    <Box sx={{display: 'flex', alignItems: 'top', gap: 0.5,}}>
                        <Box>
                            <OutgoingMailIcon sx={{fontSize: 30}} color="secondary"/>
                        </Box>
                        <Typography mt={0.3} variant='body1'
                                    fontWeight='bold'>to {TextUtils.getUserFullName(invitation.receiver)}</Typography>
                    </Box>

                    <Box mt={1} sx={{display: 'flex', alignItems: 'top', gap: 0.5}}>
                        <Box mt={0.2}>
                            <SpaceDashboard fontSize="small" color="secondary"/>
                        </Box>
                        <Typography>{invitation.event.name}</Typography>
                    </Box>
                    {invitation.description && (
                        <>
                            <Box mt={1} sx={{display: 'flex', alignItems: 'top', gap: 0.5}}>
                                <Box mt={0.45}>
                                    <SubjectIcon fontSize="small" color="secondary"/>
                                </Box>
                                <Typography>{invitation.description}</Typography>
                            </Box>
                        </>
                    )}

                    <Box sx={{display: "flex", justifyContent: "end"}}>
                        <Typography variant='body2' color='grey'>{DateUtils.formatDate(invitation.time)}</Typography>
                    </Box>

                </CardContent>
            </Box>
        </Card>
    );
};

export default SentInvitationListBox;