import React from 'react';
import {Box, Card, CardContent, CardHeader, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateUtils from "../../../utils/DateUtils";
import CommentActionsMenu from "./CommentActionsMenu";
import TextUtils from "../../../utils/TextUtils";
import Cookies from "js-cookie";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";

const CommentBox = ({event, comment, handleDeleteComment, handleEditComment}) => {
    const formattedDate = DateUtils.formatDate(comment.date)
    const isCreator = comment.creator.id.toString() === Cookies.get('userId')
    const isCommentEventCreator = event.creator.id.toString() === Cookies.get('userId')
    console.log(`comment`)
    console.log(isCommentEventCreator)
    return (
        <Card variant="outlined" sx={{borderRadius: "10px", position: 'relative'}}>
            {(isCreator || isCommentEventCreator) &&
                <Box sx={{position: 'absolute', top: 8, right: 8}}>
                    <CommentActionsMenu
                        handleDeleteComment={() => handleDeleteComment(comment.id)}
                        handleEditComment={(content) => handleEditComment(comment.id, content)}
                        commentContent={comment.text}
                    />
                </Box>
            }


            <CardHeader
                slotProps={{
                    title: {sx: {fontSize: "18px"}},
                    subheader: {sx: {color: "gray"}}
                }}
                avatar={
                    <AccountCircleIcon sx={{fontSize: "40px"}} color="secondary"/>
                }
                title={
                    <Link component={RouterLink} to={`/users/${comment.creator.id}`}>
                        {TextUtils.getUserFullName(comment.creator)}
                    </Link>
                }
                subheader={formattedDate}
            />

            <CardContent>
                <Typography mt={-2.5} variant="body1" sx={{color: 'text.secondary'}}>
                    {comment.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CommentBox;