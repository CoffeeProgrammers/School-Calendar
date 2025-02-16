import React, {useState} from 'react';
import {useFetch} from "../../hooks/useFetch";
import EventService from "../../services/EventService";
import EventBoxList from "../common/event/EventBoxList";
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Loading from "../layouts/Loading";

const Events = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState('');

    const {data: events, loading, error} = useFetch(
        EventService.getEventList, searchQuery, eventType
    );

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
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
                <Grid container spacing={0.25}>
                    {events.map(event => (
                        <Grid item xs={12} sm={6} md={3} key={event.id}>
                            <EventBoxList event={event}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default Events;
