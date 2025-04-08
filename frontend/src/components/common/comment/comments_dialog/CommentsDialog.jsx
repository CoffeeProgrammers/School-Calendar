import * as React from 'react';
import {Stack} from "@mui/material";
import CommentBox from "../CommentBox";
import ElementAdditionDialog from "../../../layouts/dialog/ElementAdditionDialog";

const CommentsDialog = ({comments, pagesCount, page, setPage}) => {

    return (
        <ElementAdditionDialog
            size={"md"}
            title={"Comments"}
            content={
                <Stack spacing={1}>
                    {comments.map(comment => (
                        <CommentBox comment={comment} key={comment.id}/>
                    ))}
                </Stack>
            }
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
        />
    );
}

export default CommentsDialog;