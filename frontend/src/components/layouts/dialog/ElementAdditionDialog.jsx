import React from 'react';
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import CloseButton from "./CloseButton";
import {Box, Divider} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import PaginationBox from "../lists/PaginationBox";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ElementAdditionDialog = ({size, title, content, pagesCount, page, setPage}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setPage(1);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                {title}
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                open={open}
                maxWidth={size}
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    {title}
                </DialogTitle>

                <CloseButton handleClose={handleClose}/>

                <Divider/>

                <DialogContent>
                    {content}
                    {pagesCount > 1 && (
                        <Box sx={{ marginTop: "auto" }}>
                            <PaginationBox
                                page={page}
                                pagesCount={pagesCount}
                                setPage={setPage}
                            />
                        </Box>
                    )}
                </DialogContent>

                <Divider sx={{ mb: 2}}/>

            </BootstrapDialog>
        </>
    );
};

export default ElementAdditionDialog;