import * as React from 'react';
import {Stack} from "@mui/material";
import CommentBox from "../CommentBox";
import ElementAdditionDialog from "../../../layouts/dialog/ElementAdditionDialog";
import CreateCommentDialog from "../CreateCommentDialog";

const CommentsDialog = ({comments, pagesCount, page, setPage, handleDeleteComment, handleEditComment, handleCreate}) => {

    return (
        <ElementAdditionDialog
            size={"md"}
            title={"Comments"}
            content={
                <Stack spacing={1}>
                    {comments.map(comment => (
                        <CommentBox
                            comment={comment}
                            handleDeleteComment={handleDeleteComment}
                            handleEditComment={handleEditComment}
                            key={comment.id}/>
                    ))}
                </Stack>
            }
            page={page}
            setPage={setPage}
            pagesCount={pagesCount}
            actions={
                <CreateCommentDialog handleCreate={handleCreate}/>
            }

        />
    );
}

export default CommentsDialog;