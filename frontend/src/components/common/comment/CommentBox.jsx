import React from 'react';
import {Box, Card, CardContent, CardHeader, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateUtils from "../../../utils/DateUtils";
import CommentActionsMenu from "./CommentActionsMenu";

const CommentBox = ({comment, handleDeleteComment, handleEditComment}) => {
    const formattedDate = DateUtils.formatDateToMDYT(comment.time)

    return (
        <Card variant="outlined" sx={{ borderRadius: "10px", position: 'relative'}}>

            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
               <CommentActionsMenu
                   handleDeleteComment={() => handleDeleteComment(comment.id)}
                   handleEditComment={(content) => handleEditComment(comment.id, content)}
                   commentContent={comment.text}
               />
            </Box>

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