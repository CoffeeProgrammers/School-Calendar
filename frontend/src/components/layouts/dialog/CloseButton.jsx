import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

const CloseButton = ({handleClose}) => {
    return (
        <IconButton
            onClick={handleClose}
            sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
        >
            <CloseIcon />
        </IconButton>
    );
};

export default CloseButton;