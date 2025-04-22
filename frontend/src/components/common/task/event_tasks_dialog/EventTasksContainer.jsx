import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Loading from "../../../layouts/Loading";
import TaskService from "../../../../services/base/ext/TaskService";
import EventTasksDialog from "./EventTasksDialog";

const EventTasksContainer = () => {
    const [tasks, setTasks] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaskService.getTasksByEvent(
                    {
                        page: page,
                    }
                );
                setTasks(response.data);
                setPagesCount(response.pages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

     const handleToggleTask = async (task) => {
        const updatedTask = await TaskService.toggleTask({
            taskId: task.id,
            isDone: task.isDone
        });

        setTasks(prevTasks =>
            prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
        );
    }

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <EventTasksDialog
            tasks={tasks}
            pagesCount={pagesCount}
            page={page}
            setPage={setPage}
            handleToggleTask={handleToggleTask}
        />
    );
}

export default EventTasksContainer;