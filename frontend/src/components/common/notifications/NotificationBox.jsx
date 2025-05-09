import React from 'react';
import Box from "@mui/material/Box";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import DateUtils from "../../../utils/DateUtils";

const NotificationBox = ({ notification }) => {
    return (
        <Card variant='outlined' sx={{ borderRadius: "10px" }}>
            <Box mb={-2}>
                <CardContent >
                    <Typography variant='body1'>{notification.content}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Typography variant='body2' color='grey'>{DateUtils.formatDateToMDT(notification.time)}</Typography>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default NotificationBox;