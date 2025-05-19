import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import CommentService from "../../../../services/base/ext/CommentService";
import CommentsDialog from "./CommentsDialog";
import {useError} from "../../../../contexts/ErrorContext";

const CommentsContainer = ({event}) => {
    const {showError} = useError()

    const [comments, setComments] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CommentService.getComments(
                    event.id,
                    page - 1,
                    10,
                );
                setComments(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [event, page]);

    const handleDeleteComment = async (deletedId) => {
        try {
            await CommentService.deleteComment(event.id, deletedId);
            setComments((prev) => prev.filter(comment => comment.id !== deletedId));
        } catch (error) {
            showError(error)
            console.error("Error deleting comment:", error);
        }
    };

    const handleEditComment = async (commentId, data) => {
        try {
            const updatedComment = await CommentService.updateComment(commentId, data);
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            text: updatedComment.text,
                            date: updatedComment.date,
                        }
                        : comment
                )
            );
        } catch (error) {
            showError(error)
            console.error("Error updating comment:", error);
        }
    };

    const handleCreateComment = async (data) => {
        try {
            const newComment = await CommentService.createComment(event.id, data);
            setComments((prev) => [newComment, ...prev]);
        } catch (error) {
            showError(error)
            console.error("Error creating comment:", error);
        }
    };


    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <CommentsDialog
            comments={comments}
            pagesCount={pagesCount}
            page={page}
            setPage={setPage}
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
            handleCreate={handleCreateComment}
            event={event}
        />
    );
}

export default CommentsContainer;