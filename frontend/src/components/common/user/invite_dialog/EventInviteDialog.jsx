import React, {useState} from 'react';
import {Box, Button, Divider, Grid2, Stack} from "@mui/material";
import BasicDataDialog from "../../../layouts/dialog/BasicDataDialog";
import {defaultButtonStyles, listPanelStyles} from "../../../../assets/styles";
import Search from "../../../layouts/lists/Search";
import OpenFiltersButton from "../../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../../layouts/lists/FiltersGroup";
import InviteUserBox from "./InviteUserBox";

const EventInviteDialog = (
    {
        searchQuery,
        setSearchQuery,
        isOpenFilterMenu,
        setOpenFilterMenu,
        role,
        setRole,
        eventTypes,
        users,
        page,
        setPage,
        pagesCount,
        handleInvite
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
            <Button onClick={handleClickOpen} variant="contained" sx={defaultButtonStyles}>
                Invite
            </Button>


            <BasicDataDialog
                open={open}
                handleClose={handleClose}
                title={"Choose the person to invite"}
                size={"md"}
                content={
                    //TODO: refactor bp
                    <>
                        <Stack direction="row" sx={listPanelStyles}>
                            <Box sx={listPanelStyles} gap={0.5}>
                                <Search
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                                <OpenFiltersButton
                                    isOpenFilterMenu={isOpenFilterMenu}
                                    setOpenFilterMenu={setOpenFilterMenu}
                                />
                            </Box>
                        </Stack>


                        <Divider sx={{mb: 1}}/>

                        {isOpenFilterMenu && (
                            <Box sx={{mb: 1}}>
                                <FiltersGroup
                                    filters={[
                                        {
                                            label: "Role",
                                            value: role,
                                            setValue: setRole,
                                            options: eventTypes
                                        }
                                    ]}
                                />
                            </Box>
                        )}
                        {/*TODO: list optimize*/}
                        <Grid2 container spacing={1.5}>
                            {users.map(user => (
                                <Grid2 size={{ xs: 12, sm: 6, md: 4}} key={user.id}>
                                   <InviteUserBox user={user} handleInvite={handleInvite}/>
                                </Grid2>
                            ))}
                        </Grid2>
                    </>
                }
                pagesCount={pagesCount}
                page={page}
                setPage={setPage}
            />
        </>
    );
};

export default EventInviteDialog;