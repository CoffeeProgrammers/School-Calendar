import React, {useEffect, useState} from 'react';
import {Box, Divider, Stack, Typography} from "@mui/material";
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import Search from "../../layouts/lists/Search";
import OpenFiltersButton from "../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import TaskList from "../../common/task/TaskList";
import TaskService from "../../../services/base/ext/TaskService";
import {listPanelStyles} from "../../../assets/styles";
import CreateTaskDialog from "../../common/task/create/CreateTaskDialog";

const isDoneSelectOptions = [
    {value: '', label: <em>None</em>},
    {value: true, label: 'Done'},
    {value: false, label: 'To-Do'}
];

const isPastSelectOptions = [
    {value: '', label: <em>None</em>},
    {value: true, label: 'Is past'},
    {value: false, label: 'Is future'}
];

const Tasks = () => {
    const [tasks, setTasks] = useState([])

    const [searchName, setSearchName] = useState('');
    const [isDone, setIsDone] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isPast, setIsPast] = useState('');

    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("isDone" + isDone)
                const response = await TaskService.getMyTasks(
                    page - 1,
                    15,
                    searchName,
                    deadline,
                    isDone,
                    isPast
                );
                console.log("tasks:")
                console.log(response)

                setTasks(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchName, deadline, isDone, page, isPast]);


    const handleCreate = async (newTask) => {
        try {
            const createdTask = await TaskService.createTask(0, newTask);
            setTasks((prevTasks) => [createdTask, ...prevTasks]);
            setPage(1);
            setSearchName('');
            setDeadline('');
            setIsDone('');
            setIsPast('');
        } catch (error) {
            setError(error);
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Box sx={{
                width: "1295px",
                border: '1px solid #ddd',
                padding: '20px',
                margin: '10px',
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column"
            }}>
                <Stack direction="row" sx={listPanelStyles}>
                    <Typography variant="h4">Tasks</Typography>
                    <Box sx={listPanelStyles} gap={0.5}>
                        <Search
                            searchQuery={searchName}
                            setSearchQuery={setSearchName}
                        />
                        <OpenFiltersButton
                            isOpenFilterMenu={isOpenFilterMenu}
                            setOpenFilterMenu={setOpenFilterMenu}
                        />

                        <CreateTaskDialog handleCreate={handleCreate}/>
                    </Box>
                </Stack>


                <Divider sx={{mb: 1, mt: 0.5}}/>

                {isOpenFilterMenu && (
                    <Box sx={{mb: 1}}>
                        <FiltersGroup
                            filters={[
                                {
                                    label: "Status",
                                    value: isDone,
                                    setValue: setIsDone,
                                    options: isDoneSelectOptions,
                                    type: "select"
                                },
                                {
                                    label: "Is past",
                                    value: isPast,
                                    setValue: setIsPast,
                                    options: isPastSelectOptions,
                                    type: "select"
                                },
                                {
                                    label: "Deadline <",
                                    value: deadline,
                                    setValue: setDeadline,
                                    type: "date"
                                }
                            ]}
                        />
                    </Box>
                )}

                <TaskList
                    tasks={tasks}
                />

                {pagesCount > 1 && (
                    <Box sx={{marginTop: "auto"}}>
                        <PaginationBox
                            page={page}
                            pagesCount={pagesCount}
                            setPage={setPage}
                        />
                    </Box>
                )}


            </Box>
        </>
    );
};

export default Tasks;
