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
    {value: '', label: <em>None</em>},
    {value: 'STUDENTS_MEETING', label: 'Students meeting'},
    {value: 'TEACHERS_MEETING', label: 'TEACHERS_MEETING'},
    {value: 'meetup', label: 'Meetup'},
    {value: 'seminar', label: 'Seminar'},
    {value: 'webinar', label: 'Webinar'},
    {value: 'training', label: 'Training'},
    {value: 'panelDiscussion', label: 'Panel Discussion'},
    {value: 'roundTable', label: 'Round Table'},
    {value: 'lecture', label: 'Lecture'},
    {value: 'symposium', label: 'Symposium'},
    {value: 'hackathon', label: 'Hackathon'},
    {value: 'exhibition', label: 'Exhibition'},
    {value: 'tradeShow', label: 'Trade Show'},
    {value: 'conferenceCall', label: 'Conference Call'},
    {value: 'liveStream', label: 'Live Stream'},
    {value: 'panel', label: 'Panel'},
    {value: 'keynote', label: 'Keynote'},
    {value: 'presentation', label: 'Presentation'},
    {value: 'networkingEvent', label: 'Networking Event'},
    {value: 'productLaunch', label: 'Product Launch'},
    {value: 'charityEvent', label: 'Charity Event'},
    {value: 'pressConference', label: 'Press Conference'},
    {value: 'focusGroup', label: 'Focus Group'},
    {value: 'careerFair', label: 'Career Fair'},
    {value: 'jobFair', label: 'Job Fair'}
];

const Events = () => {
    const navigate = useNavigate();

    const [events, setEvents] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState('');
    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getAllMyEvents(
                    {
                        page: page - 1,
                        size: 15,
                        search: searchQuery,
                        type: eventType
                    }
                );
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
    }, [searchQuery, eventType, page]);


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Box sx={{border: '1px solid #ddd', padding: '20px', margin: '10px', borderRadius: "10px",}}>
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
                                    //TODO: Date
                                    label: "Date",
                                    options: [{value: "", label: <em>Todo</em>}]
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
