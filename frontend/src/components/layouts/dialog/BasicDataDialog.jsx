import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import CloseButton from "./CloseButton";
import {Box, DialogActions, Divider} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import PaginationBox from "../lists/PaginationBox";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BasicDataDialog = (
    {
        open,
        handleClose,
        size,
        title,
        content,
        pagesCount,
        page,
        setPage,
        actions
    }) => {

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                open={open}
                maxWidth={size}
                fullWidth
            >
                <DialogTitle sx={{m: 0, p: 2}}>
                    {title}
                </DialogTitle>

                <CloseButton handleClose={handleClose}/>

                <Divider/>

                <DialogContent>
                    {content}
                    {pagesCount > 1 && (
                        <Box sx={{marginTop: "auto"}}>
                            <PaginationBox
                                page={page}
                                pagesCount={pagesCount}
                                setPage={setPage}
                            />
                        </Box>
                    )}
                </DialogContent>

                <Divider sx={{mb: 2}}/>

                <DialogActions>
                    {actions}
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};

export default BasicDataDialog;