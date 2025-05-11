import React, {useEffect, useState} from 'react';
import {Box, Divider, Grid, Stack, Typography} from "@mui/material";
import EventService from "../../../services/base/ext/EventService";
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import Search from "../../layouts/lists/Search";
import OpenFiltersButton from "../../layouts/lists/OpenFiltersButton";
import DefaultButton from "../../layouts/DefaultButton";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import EventBox from "../../common/event/EventBox";
import {useNavigate} from "react-router-dom";

const eventTypes = [
    { value: '', label: <em>None</em> },
    { value: 'TEACHERS_MEETING', label: 'Teachers meeting' },
    { value: 'STUDENTS_MEETING', label: 'Students meeting' },
    { value: 'PARENTS_MEETING', label: 'Parents meeting' },
    { value: 'TEST', label: 'Test' },
    { value: 'ENTERTAINMENT', label: 'Entertainment' },
    { value: 'PERSONAL', label: 'Personal' },
    { value: 'COUNCIL_MEETING', label: 'Council meeting' }
];

const isPastFilterOptions = [
    { value: "", label: <em>None</em> },
    { value: true, label: 'Is past' },
    { value: false, label: 'Is coming' },

];


const Events = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState('');
    const [isPastFilter, setIsPastFilter] = useState("")

    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getMyEvents(
                    page - 1,
                    10,
                    searchQuery,
                    "",
                    "",
                    isPastFilter,
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
    }, [searchQuery, eventType, page, isPastFilter]);


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
                                    label: "Type",
                                    value: eventType,
                                    setValue: setEventType,
                                    options: eventTypes
                                },
                                {
                                    label: "Is past",
                                    value: isPastFilter,
                                    setValue: setIsPastFilter,
                                    options: isPastFilterOptions
                                }
                            ]}
                        />
                    </Box>
                )}

                {/*TODO: list optimize*/}
                <Grid container spacing={1.5}>
                    {events.map(event => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4}} key={event.id}>
                            <Box onClick={() => navigate(`${event.id}`)}>
                                <EventBox event={event}/>
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
