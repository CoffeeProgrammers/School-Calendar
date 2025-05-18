import React, {useEffect, useState} from 'react';
import {Box, Divider, Grid, IconButton, Stack, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";
import BasicDataDialog from "../../layouts/dialog/BasicDataDialog";
import Search from "../../layouts/lists/Search";
import OpenFiltersButton from "../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import {eventTypes} from "../../../utils/constants";
import EventListBox from "./list/EventListBox";
import EventService from "../../../services/base/ext/EventService";

const AssignEventToTaskDialog = ({event, setEvent}) => {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate();

    const [events, setEvents] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('')
    const [endDateFilter, setEndDateFilter] = useState('')

    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getMyEvents(
                    page - 1,
                    15,
                    searchQuery,
                    startDateFilter,
                    endDateFilter,
                    eventType
                );

                console.log("events:")
                console.log(response)

                setEvents(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [endDateFilter, eventType, page, searchQuery, startDateFilter]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, eventType, startDateFilter, endDateFilter]);


    const handleClear = () => {
        setEvent(null);
    }

    return (
        <>
            <Box onClick={() => setOpen(true)}>
                <TextField
                    label="Event"
                    fullWidth
                    variant="outlined"
                    multiline
                    value={event ? event.name : "---"}

                    slotProps={{
                        input: {
                            readOnly: true,
                            endAdornment: (
                                <IconButton
                                    size="large"
                                    onClick={handleClear}
                                    sx={{cursor: "pointer", padding: 0}}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            ),
                        },
                    }}
                />
            </Box>

            <BasicDataDialog
                open={open}
                handleClose={() => setOpen(false)}
                title={"Choose the event to assign"}
                content={
                    <>
                        <Stack direction="row" sx={{alignItems: 'center', display: "flex", justifyContent: "space-between "}}>
                            <Typography variant="h4">Events</Typography>
                            <Box sx={{alignItems: 'center', display: "flex", justifyContent: "space-between"}} gap={0.5}>
                                <Search
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                                <OpenFiltersButton
                                    isOpenFilterMenu={isOpenFilterMenu}
                                    setOpenFilterMenu={setOpenFilterMenu}
                                />
                            </Box>
                        </Stack>

                        <Divider sx={{mb: 1, mt: 0.5}}/>

                        {isOpenFilterMenu && (
                            <Box sx={{mb: 1}}>
                                <FiltersGroup
                                    filters={[
                                        {
                                            label: "Type",
                                            value: eventType,
                                            setValue: setEventType,
                                            options: eventTypes,
                                            type: "select"
                                        },
                                        {
                                            label: "Start date >",
                                            value: startDateFilter,
                                            setValue: setStartDateFilter,
                                            type: "date"
                                        },
                                        {
                                            label: "End date <",
                                            value: endDateFilter,
                                            setValue: setEndDateFilter,
                                            type: "date"
                                        },
                                    ]}
                                />
                            </Box>
                        )}

                        {/*TODO: list optimize*/}
                        <Grid container spacing={1.5}>
                            {events.map(event => (
                                <Grid size={{ xs: 12, sm: 6, md: 4}} key={event.id}>
                                    <Box onClick={() => navigate(`${event.id}`)}>
                                        <EventListBox event={event}/>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                }
                pagesCount={pagesCount}
                page={page}
                setPage={setPage}
                size={"md"}
            />


        </>
    );
};

export default AssignEventToTaskDialog;
