import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateService from "../../../services/simple/DateService";

const CommentBox = ({comment}) => {
    const formattedDate = DateService.formatDateToMDYT(comment.time)

    return (
        <Card variant="outlined" sx={{ borderRadius: "10px" }}>
            <CardHeader
                titleTypographyProps={{ fontSize: "18px" }}
                subheaderTypographyProps={{ color: "gray" }}
                avatar={
                    <AccountCircleIcon sx={{fontSize: "40px"}} color="secondary" />
                }
                title={comment.creator.first_name + " " + comment.creator.last_name}
                subheader={formattedDate}
            />

            <CardContent >
                <Typography mt={-2.5} variant="body1" sx={{ color: 'text.secondary' }}>
                    {comment.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CommentBox;