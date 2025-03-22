import React, {useEffect, useState} from 'react';
import EventService from "../../services/ext/EventService";
import {Box, Divider, Stack, Typography} from "@mui/material";
import Loading from "../layouts/Loading";
import PaginationBox from "../layouts/lists/PaginatioBox";
import Search from "../layouts/lists/Search";
import OpenFiltersButton from "../layouts/lists/OpenFiltersButton";
import DefaultButton from "../layouts/DefaultButton";
import EventList from "../common/event/EventList";
import FiltersGroup from "../layouts/lists/FiltersGroup";

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

const eventTypes = [
    {value: '', label: <em>None</em>},
    {value: 'conference', label: 'Conference'},
    {value: 'workshop', label: 'Workshop'},
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
    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState('');

    const [events, setEvents] = useState([])

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getAllMyEvents(
                    {
                        page: page,
                        size: 10,
                        searchQuery: searchQuery,
                        type: eventType,
                        date: ''
                    }
                );
                setEvents(response.data);
                setPagesCount(response.pages)
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
            <Box sx={mainBoxStyles}>
                <Typography mb={1} variant="h5">Events</Typography>

                <Stack direction="row" sx={listPanelStyles}>
                    <Search
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <Box sx={{display: "flex"}} gap={1}>
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
                                    label: "Date",
                                    options: [{value: "", label: <em>Todo</em>}]
                                }
                            ]}
                        />
                    </Box>
                )}

                <EventList
                    events={events}
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

export default Events;
