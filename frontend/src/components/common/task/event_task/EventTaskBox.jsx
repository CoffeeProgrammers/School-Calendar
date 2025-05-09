import React, {useState} from 'react';
import {Box, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import theme from "../../../../assets/theme";
import EventTaskActionsMenu from "./EventTaskActionsMenu";
import DateUtils from "../../../../utils/DateUtils";

const EventTaskBox = ({task, handleToggleTask, handleRemove}) => {
    const [actionMenuPosition, setActionMenuPosition] = useState(null);

    const handleClick = (event) => {
        event.preventDefault();
        setActionMenuPosition({
            top: event.clientY,
            left: event.clientX
        });
    };

    const handleCloseMenu = () => {
        setActionMenuPosition(null);
    };

    const toggleCheckbox = () => {
        handleToggleTask()
    }

    return (
        <>
            <ListItem
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
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon
                        sx={{minWidth: 'unset', marginRight: 1, marginLeft: 0.5}}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleCheckbox();
                        }}
                    >
                        <Checkbox
                            color="secondary"
                            edge="start"
                            checked={task.isDone}
                            tabIndex={-1}
                            disableRipple
                            sx={{
                                borderRadius: "5px",
                                width: "30px",
                                height: "30px",
                                transition: "background-color 0.4s, border-color 0.4s, box-shadow 0.4s",
                                "&:hover": {
                                    color: theme.palette.secondary.main,
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                },
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText sx={{mr: 2}} primary={task.name}/>
                    <Box sx={{marginLeft: 'auto', minWidth: '100px'}}>
                        <ListItemText secondary={DateUtils.formatDateToMDT(task.deadline)}/>
                    </Box>
                </ListItemButton>
            </ListItem>

            <EventTaskActionsMenu
                task={task}
                anchorPosition={actionMenuPosition}
                onClose={handleCloseMenu}
                handleRemove={handleRemove}
            />
        </>
    );
};

export default EventTaskBox;