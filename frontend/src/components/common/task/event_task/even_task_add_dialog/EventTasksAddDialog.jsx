import React, {useState} from 'react';
import {Box, Button, Divider, Grid2, Stack} from "@mui/material";
import {defaultButtonStyles, listPanelStyles} from "../../../../../assets/styles";
import Search from "../../../../layouts/lists/Search";
import OpenFiltersButton from "../../../../layouts/lists/OpenFiltersButton";
import DefaultButton from "../../../../layouts/DefaultButton";
import FiltersGroup from "../../../../layouts/lists/FiltersGroup";
import BasicDataDialog from "../../../../layouts/dialog/BasicDataDialog";
import AddTaskBox from "./AddTaskBox";


const EventTasksAddDialog = (
    {
        tasks,
        isDone,
        setIsDone,
        isDoneSelectOptions,
        searchQuery,
        setSearchQuery,
        isOpenFilterMenu,
        setOpenFilterMenu,
        page,
        setPage,
        pagesCount,
        handleAdd
    }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setPage(1);
    };
    return (
        <>
            <Button onClick={handleClickOpen} variant="contained" sx={defaultButtonStyles}>
                Add
            </Button>

            <BasicDataDialog
                open={open}
                handleClose={handleClose}
                title={"Choose the tasks to add"}
                size={"md"}
                content={
                    //TODO: refactor bp
                    <>
                        <Stack direction="row" sx={listPanelStyles}>
                            <Box sx={listPanelStyles} gap={0.5}>
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
                        {/*//TODO: list optimize*/}
                        <Grid2 container spacing={1.5}>
                            {tasks.map(task => (
                                <Grid2 item size={{ xs: 12, sm: 6, md: 4}} key={task.id}>
                                    <AddTaskBox task={task} handleAdd={handleAdd}/>
                                </Grid2>
                            ))}
                        </Grid2>
                    </>

                }
                pagesCount={pagesCount}
                page={page}
                setPage={setPage}
            />
        </>
    );
};

export default EventTasksAddDialog;