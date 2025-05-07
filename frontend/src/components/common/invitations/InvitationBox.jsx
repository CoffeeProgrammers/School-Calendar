import React from 'react';
import Box from "@mui/material/Box";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

const InvitationBox = ({invitation}) => {
    return (
        <Card variant='outlined' sx={{ borderRadius: "10px" }}>
            <Box mb={-2}>
                <CardHeader
                    titleTypographyProps={{ fontSize: "18px" }}
                    subheaderTypographyProps={{ color: "gray" }}
                    avatar={
                        <AccountCircleIcon sx={{ fontSize: "40px" }} color="secondary" />
                    }
                    title={invitation.creator.first_name + " " + invitation.creator.last_name}
                    subheader={invitation.date}
                    sx={{ paddingBottom: "0" }}
                />
                <CardContent
                    sx={{ paddingTop: "10px" }}
                >
                    <Typography>{invitation.event.name + ". " + invitation.event.start_date + " -> " + invitation.event.end_date}</Typography>
                    <Typography mt={1}>{"Description: " + invitation.description}</Typography>
                    {invitation.warning && (
                        <Box mt={1} p={2} bgcolor={"#d11507"} color={"#fff"} borderRadius={"10px"}>
                            <Typography>Warning</Typography>
                            <Typography>{invitation.warning}</Typography>
                        </Box>
                    )}
                    <Box mt={1} sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Button variant="contained" sx={{
                            marginRight: "10px",
                            backgroundColor: "red[700]",
                            '&:hover': { backgroundColor: "red[500]" },
                            color: "white",
                        }}>
                            Reject
                        </Button>
                        <Button variant="contained" sx={{
                            backgroundColor: 'secondary.main',
                            '&:hover': { backgroundColor: 'secondary.light' },
                            color: "white",
                        }}>
                            Accept
                        </Button>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default InvitationBox;