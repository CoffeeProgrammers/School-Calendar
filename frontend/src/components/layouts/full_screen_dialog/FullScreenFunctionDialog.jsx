import React from 'react';
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

const FullScreenFunctionDialog = ({open, handleClose, children}) => {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            slots={{transition: Transition}}
        >
            {children}
        </Dialog>
    );
};

export default FullScreenFunctionDialog;