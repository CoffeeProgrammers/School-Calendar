import React from 'react';
import {Box, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DateService from "../../../services/simple/DateService";

const EventTaskBox = ({task, handleToggleTask}) => {

    const toggleCheckbox = () => {
        handleToggleTask()
    }
    return (
        <ListItem
            key={task}
            disablePadding
            sx={{
                border: '1px solid #ddd',
                borderRadius: "10px",
                overflow: 'hidden',
                transition: "background-color 0.4s, border-color 0.4s, box-shadow 0.4s",
                "&:hover": {
                    borderRadius: "10px",
                    cursor: "pointer",
                    bgcolor: "#f0f0f0",
                    borderColor: "#999",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            <ListItemButton onClick={toggleCheckbox}>
                <ListItemIcon>
                    <Checkbox
                        color="secondary"
                        edge="start"
                        checked={task.isDone}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary={task.name}/>
                <Box sx={{marginLeft: 'auto'}}>
                    <ListItemText secondary={DateService.formatDateToMDT(task.deadline)}/>
                </Box>
            </ListItemButton>
        </ListItem>
    );
};

export default EventTaskBox;