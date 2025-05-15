import React, {useState} from 'react';
import {Box, Button, Divider, Grid, Stack} from "@mui/material";
import BasicDataDialog from "../../../layouts/dialog/BasicDataDialog";
import {defaultButtonStyles, listPanelStyles} from "../../../../assets/styles";
import Search from "../../../layouts/lists/Search";
import OpenFiltersButton from "../../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../../layouts/lists/FiltersGroup";
import Cookies from "js-cookie";
import InviteUserBox from "./InviteUserBox";

const roles = [
    {value: '', label: <em>None</em>},
    {value: 'teacher', label: 'Teacher'},
    {value: 'student', label: 'Student'},
    {value: 'parents', label: 'Parents'},

];
const EventInviteDialog = (
    {
        searchEmail,
        setSearchEmail,
        isOpenFilterMenu,
        setOpenFilterMenu,
        role,
        setRole,
        users,
        page,
        setPage,
        pagesCount,
        handleInvite,
        searchFirstName,
        setSearchFirstName,
        searchLastName,
        setSearchLastName,
    }) => {

    const isTeacher = "TEACHER" === Cookies.get("role");
    const isStudent = "STUDENT" === Cookies.get("role");

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setPage(1);
    };

    if (isStudent) {
        setRole("STUDENT");
    }

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
                                    label={"First Name"}
                                    searchQuery={searchFirstName}
                                    setSearchQuery={setSearchFirstName}
                                />
                                <Search
                                    label={"Last Name"}
                                    searchQuery={searchLastName}
                                    setSearchQuery={setSearchLastName}
                                />
                                <Search
                                    label={"Email"}
                                    searchQuery={searchEmail}
                                    setSearchQuery={setSearchEmail}
                                />

                                {isTeacher && (
                                    <OpenFiltersButton
                                        isOpenFilterMenu={isOpenFilterMenu}
                                        setOpenFilterMenu={setOpenFilterMenu}
                                    />
                                )}
                            </Box>
                        </Stack>


                        <Divider sx={{mb: 1, mt: 0.5}}/>

                        {isOpenFilterMenu && isTeacher && (
                            <Box sx={{mb: 1}}>
                                <FiltersGroup
                                    filters={[
                                        {
                                            label: "Role",
                                            value: role,
                                            setValue: setRole,
                                            options: roles,
                                            type: "select"
                                        }
                                    ]}
                                />
                            </Box>
                        )}

                        {/*TODO: list optimize*/}
                        <Grid container spacing={1.5}>
                            {users.map(user => (
                                <Grid size={{ xs: 12, sm: 6, md: 4}} key={user.id}>
                                    <InviteUserBox user={user} handleInvite={handleInvite}/>
                                </Grid>
                            ))}
                        </Grid>
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