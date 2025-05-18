import Page from "../../layouts/Page";
import {Box} from "@mui/material";
import TasksMainPageContent from "../../common/task/TasksMainPageContent";
import React from "react";
import CalendarContent from "../../common/event/calendar/CalendarContent";

const MainPage = () => {
    return (
        <Page>
            <Box sx={{
                maxWidth: "250px",
                width: '100%',
                height: '100%',
                border: '1px solid #ddd',
                padding: '20px',
                margin: '10px',
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column"
            }}>
                <TasksMainPageContent/>
            </Box>
            <Box sx={{
                width: '100%',
                height: '100%',
                border: '1px solid #ddd',
                padding: '10px',
                margin: '10px',
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column"
            }}>
                <CalendarContent/>
            </Box>
        </Page>
    );
};

export default MainPage;