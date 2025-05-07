import React from 'react';
import Box from "@mui/material/Box";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

const NotificationBox = ({notification}) => {
    return (
        <Card variant='outlined' sx={{ borderRadius: "10px" }}>
            <Box mb={-2}>
                <CardContent >
                    <Typography>{notification.message}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Typography variant='subtitle2'>{notification.date}</Typography>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default NotificationBox;