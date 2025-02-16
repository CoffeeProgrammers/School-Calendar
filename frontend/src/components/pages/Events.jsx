import React, { useEffect, useState } from 'react';
import EventService from "../../services/EventService";
import EventBoxList from "../common/event/EventBoxList";
import SearchIcon from '@mui/icons-material/Search';
import '../../assets/css/style.css'

import {
    Box,
    FormControl,
    Grid, IconButton,
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
    const [events, setEvents] = useState([])

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventService.getEventList("", "");
                setEvents(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    const handleSearch = async () => {
        const response = await EventService.getEventList(searchQuery, eventType);
        setEvents(response)
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='events-container'>
            <Typography variant="h4">Events</Typography>
            <Box style={{ border: '1px solid #ddd', padding: '20px', margin: '10px', borderRadius: "12px" }}>
                <Stack direction="row" gap={2}>
                    <TextField
                        label="Search events..."
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                    />
                    <IconButton onClick={handleSearch} aria-label="search">
                        <SearchIcon />
                    </IconButton>

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
                            <EventBoxList event={event} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default Events;
