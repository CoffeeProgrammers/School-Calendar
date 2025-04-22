import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Loading from "../../../layouts/Loading";
import CommentService from "../../../../services/ext/CommentService";
import CommentsDialog from "./CommentsDialog";

//TODO: update|delete|create for comment creator, delete for event creator
const CommentsContainer = () => {
    const [comments, setComments] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CommentService.getCommentsByEventId(
                    {
                        page: page,
                    }
                );
                setComments(response.data);
                setPagesCount(response.pages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const handleDeleteComment = async (deletedId) => {
        await CommentService.deleteComment(deletedId);
        setComments((prev) => prev.filter(comment => comment.id !== deletedId));
    };

    const handleEditComment = async (commentId, newText) => {
        const updatedComment = await CommentService.updateComment(commentId, newText);

        setComments((prev) =>
            prev.map(comment =>
                comment.id === commentId ?
                    {
                        ...comment,
                        text: updatedComment.text,
                        time: updatedComment.time
                    } : comment
            )
        );

    };

    const handleCreateComment = async (text) => {
        const newComment = await CommentService.createComment( text );
        setComments((prev) => [newComment, ...prev]);
    };

    if (loading) {
        return <Loading/>;
    }

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
        />
    );
}

export default CommentsContainer;