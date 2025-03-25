import React, {useEffect, useState} from 'react';
import {Box, Divider, Stack, Typography} from "@mui/material";
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import Search from "../../layouts/lists/Search";
import OpenFiltersButton from "../../layouts/lists/OpenFiltersButton";
import DefaultButton from "../../layouts/DefaultButton";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import TaskList from "../../common/task/TaskList";
import TaskService from "../../../services/ext/TaskService";

const listPanelStyles = {
    alignItems: 'center',
    display: "flex",
    justifyContent: "space-between"
}

const mainBoxStyles = {
    minHeight: "525px", // todo: 3 lines height
    border: '1px solid #ddd',
    padding: '20px 20px 8px 20px',
    margin: '10px',
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column"
};

const isDoneSelectOptions = [
    {value: '', label: <em>None</em>},
    {value: true, label: 'Done'},
    {value: false, label: 'To-Do'}
];

const Tasks = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [isDone, setIsDone] = useState('');
    const [deadline, setDeadline] = useState('');


    const [tasks, setTasks] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

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


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Box sx={mainBoxStyles}>
                <Stack direction="row" mb={1} sx={listPanelStyles}>
                    <Typography variant="h4">Tasks</Typography>
                    <Box sx={{display: "flex"}} gap={0.5}>
                        <Search
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        <OpenFiltersButton
                            isOpenFilterMenu={isOpenFilterMenu}
                            setOpenFilterMenu={setOpenFilterMenu}
                        />

                        <DefaultButton>
                            New
                        </DefaultButton>
                    </Box>
                </Stack>


                <Divider sx={{mb: 1}}/>

                {isOpenFilterMenu && (
                    <Box sx={{mb: 1}}>
                        <FiltersGroup
                            filters={[
                                {
                                    label: "Status",
                                    value: isDone,
                                    setValue: setIsDone,
                                    options: isDoneSelectOptions
                                },
                                {
                                    label: "Date",
                                    options: [{value: "", label: <em>Todo</em>}]
                                }
                            ]}
                        />
                    </Box>
                )}

                <TaskList
                    tasks={tasks}
                />

                {pagesCount > 1 && (
                    <Box sx={{ marginTop: "auto" }}>
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
