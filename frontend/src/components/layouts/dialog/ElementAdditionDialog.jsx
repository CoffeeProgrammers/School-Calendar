import React, {useState} from 'react';
import Button from "@mui/material/Button";
import BasicDataDialog from "./BasicDataDialog";


const ElementAdditionDialog = (
    {
        size,
        title,
        content,
        pagesCount,
        page,
        setPage,
        actions
    }) => {

    const [open, setOpen] = useState(false);

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

            <BasicDataDialog
                open={open}
                handleClose={handleClose}
                title={title}
                actions={actions}
                content={content}
                pagesCount={pagesCount}
                page={page}
                setPage={setPage}
                size={size}
            />
        </>
    );
};

export default ElementAdditionDialog;