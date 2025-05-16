import React from 'react';
import {useParams} from "react-router-dom";
import Page from "../../layouts/Page";
import EventContainer from "../../common/event/page/EventContainer";

const EventPage = () => {
    const {id} = useParams();

    return (
        <Page>
            <EventContainer eventId={id}/>
        </Page>
    );
};

export default EventPage;