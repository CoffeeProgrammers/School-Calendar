import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import EventTasksDialog from "./EventTasksDialog";
import TaskService from "../../../../../services/base/ext/TaskService";

const EventTasksContainer = ({eventId}) => {
    const [tasks, setTasks] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaskService.getTasksByEvent(
                    eventId,
                    page - 1,
                    9
                );
                console.log("tasks:")
                console.log(response)

                setTasks(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [eventId, page]);

    const handleToggleTask = async (taskId) => {
        try {
            const updatedTask = await TaskService.toggleTaskDone(taskId);
            setTasks(prevTasks =>
                prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
            );
        } catch (error) {
            console.error("Failed to toggle task:", error);
            setError(error);
        }
        
    }

    const handleRemove = async (taskId) => {
        try {
            await TaskService.unsignTaskFromEvent(taskId);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Failed to remove task:", error);
            setError(error);
        }
    };


    const handleAdd = async (taskId) => {
        try {
            const createdTask = await TaskService.assignTaskToEvent(eventId, taskId);
            setTasks(prevTasks => [...prevTasks, createdTask]);
        } catch (error) {
            console.error("Failed to add task:", error);
            setError(error);
        }
    };
    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <EventTasksDialog
            eventId={eventId}
            tasks={tasks}
            pagesCount={pagesCount}
            page={page}
            setPage={setPage}
            handleToggleTask={handleToggleTask}
            handleRemove={handleRemove}
            handleAddTask={handleAdd}
        />
    );
}

export default EventTasksContainer;