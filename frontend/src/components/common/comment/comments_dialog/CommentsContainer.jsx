import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Loading from "../../../layouts/Loading";
import CommentService from "../../../../services/base/ext/CommentService";
import CommentsDialog from "./CommentsDialog";

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
        />
    );
}

export default CommentsContainer;