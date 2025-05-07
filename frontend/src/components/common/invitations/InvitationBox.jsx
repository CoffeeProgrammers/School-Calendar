import React from 'react';
import Box from "@mui/material/Box";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import {defaultButtonStyles, disagreeButtonStyles} from "../../../assets/styles";

const InvitationBox = ({invitation}) => {
    return (
        <Card variant='outlined' sx={{borderRadius: "10px"}}>
            <Box mb={-2}>
                <CardHeader
                    slotProps={{
                        title: {sx: {fontSize: "18px"}},
                        subheader: {sx: {color: "gray"}}
                    }}
                    avatar={
                        <AccountCircleIcon sx={{fontSize: "40px"}} color="secondary"/>
                    }
                    //TODO TextUtils
                    title={invitation.creator.first_name + " " + invitation.creator.last_name}
                    subheader={invitation.date}
                    sx={{paddingBottom: "0"}}
                />
                <CardContent sx={{paddingTop: "10px"}}>
                    <Typography>
                        You have been invited to
                        event {invitation.event.name} at {invitation.event.start_date + "  ⭢  " + invitation.event.end_date}.
                    </Typography>

                    <Typography mt={1.5}>{invitation.description}</Typography>

                    {invitation.warning && (
                        <Box mt={1} p={2} border={"2px solid #d11507"} borderRadius={"10px"}>
                            <Typography color={'#d11507'} fontWeight={'bold'}>Warning</Typography>
                            <Typography>{invitation.warning}</Typography>
                        </Box>
                    )}

                    <Box mt={1} sx={{display: 'flex', justifyContent: 'end', gap: 1}}>
                        <Button variant="contained" sx={disagreeButtonStyles}>
                            Reject
                        </Button>
                        <Button variant="contained" sx={defaultButtonStyles}>
                            Accept
                        </Button>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default InvitationBox;