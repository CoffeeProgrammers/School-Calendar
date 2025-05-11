import React, {useEffect, useState} from 'react';
import Loading from "../../../../layouts/Loading";
import {Typography} from "@mui/material";
import EventTasksAddDialog from "./EventTasksAddDialog";
import TaskService from "../../../../../services/base/ext/TaskService";

const isDoneSelectOptions = [
    {value: '', label: <em>None</em>},
    {value: true, label: 'Done'},
    {value: false, label: 'To-Do'}
];

const EventTasksDialogContainer = ({handleAddTask}) => {
    const [tasks, setTasks] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);


    const [isDone, setIsDone] = useState('');
    const [deadline, setDeadline] = useState('');

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaskService.getMyTasks(
                    {
                        page: page,
                        searchQuery: searchQuery,
                        deadline: deadline,
                        isDone: isDone
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
    }, [searchQuery, deadline, isDone, page]);

    const handleRemoveTaskFromAddList = async (task) => {
        handleAddTask(task);
        console.log("remove task " + task.title);
        setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
    }

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }
    return (
        <EventTasksAddDialog
            tasks={tasks}
            page={page}
            pagesCount={pagesCount}
            setPage={setPage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isDone={isDone}
            isDoneSelectOptions={isDoneSelectOptions}
            setIsDone={setIsDone}
            deadline={deadline}
            setDeadline={setDeadline}
            isOpenFilterMenu={isOpenFilterMenu}
            setOpenFilterMenu={setOpenFilterMenu}
            handleAdd={handleRemoveTaskFromAddList}
        />
    );
};

export default EventTasksDialogContainer;