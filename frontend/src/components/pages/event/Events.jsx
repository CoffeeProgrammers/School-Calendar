import React, {useEffect, useState} from 'react';
import {Box, Divider, Grid, Stack, Typography} from "@mui/material";
import EventService from "../../../services/base/ext/EventService";
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import Search from "../../layouts/lists/Search";
import OpenFiltersButton from "../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import EventListBox from "../../common/event/list/EventListBox";
import {useNavigate} from "react-router-dom";
import {eventTypes} from "../../../utils/constants";
import CreateEventDialog from "../../common/event/create/CreateEventDialog";

const Events = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('')
    const [endDateFilter, setEndDateFilter] = useState('')

    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, eventType, startDateFilter, endDateFilter]);

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
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endDateFilter, eventType, page, searchQuery, startDateFilter]);


    
    const handleCreate = async (newEvent) => {
        try {
            console.log(newEvent)
            setLoading(true);
            const createdEvent = await EventService.createEvent(newEvent);
            setEvents(prevEvents => [createdEvent, ...prevEvents]);
            setPage(1);
            setSearchQuery('');
            setStartDateFilter('');
            setEndDateFilter('');
            setEventType('');
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
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
            <Box sx={{width: '1500px', border: '1px solid #ddd', padding: '20px', margin: '10px', borderRadius: "10px",}}>
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

                       <CreateEventDialog handleCreate={handleCreate}/>
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
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4}} key={event.id}>
                            <Box onClick={() => navigate(`${event.id}`)}>
                                <EventListBox event={event}/>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

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

export default Events;
