import React, {useEffect, useState} from 'react';
import EventService from "../../services/ext/EventService";
import EventBoxList from "../common/event/EventBoxList";

import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import Loading from "../layouts/Loading";

const Events = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState('');
    const [events, setEvents] = useState([])

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getAllMyEvents(
                    {
                        page: 1,
                        size: 10,
                        searchQuery: searchQuery,
                        type: eventType,
                        date: ''
                    }
                );
                setEvents(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchQuery, eventType]);


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Typography variant="h4">Events</Typography>
            <Box style={{border: '1px solid #ddd', padding: '20px', margin: '10px', borderRadius: "12px"}}>
                <Stack direction="row" gap={2}>
                    <TextField
                        label="Search events..."
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel>Event Type</InputLabel>
                        <Select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            label="Event Type"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="conference">Conference</MenuItem>
                            <MenuItem value="workshop">Workshop</MenuItem>
                            <MenuItem value="meetup">Meetup</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Grid container>
                    {events.map(event => (
                        <Grid item xs={15} sm={6} md={5} lg={2.4} key={event.id}>
                            <EventBoxList event={event}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default Events;
