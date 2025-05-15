import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import UserService from "../../../../services/base/ext/UserService";
import Loading from "../../../layouts/Loading";
import EventService from "../../../../services/base/ext/EventService";
import ElementAdditionDialog from "../../../layouts/dialog/ElementAdditionDialog";
import {Box, Divider, Grid, Stack} from "@mui/material";
import EventInviteContainer from "../invite_dialog/EventInviteContainer";
import {listPanelStyles} from "../../../../assets/styles";
import Search from "../../../layouts/lists/Search";
import OpenFiltersButton from "../../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../../layouts/lists/FiltersGroup";
import PaginationBox from "../../../layouts/lists/PaginationBox";
import ParticipantBox from "./ParticipantBox";

const roleTypes = [
    {value: '', label: <em>None</em>},
    {value: 'TEACHER', label: 'Teacher'},
    {value: 'STUDENT', label: 'Student'},
    {value: 'PARENT', label: 'Parents'},

];

const ParticipantsContainer = ({eventId, isCreator}) => {
    const [users, setUsers] = useState([])

    const [searchFirstName, setSearchFirstName] = useState('');
    const [searchLastName, setSearchLastName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');

    const [role, setRole] = useState('');
    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //TODO: search & filters
                const response = await UserService.getUsersByEvent(
                    eventId,
                    page - 1,
                    15,
                    searchFirstName,
                    searchLastName,
                    searchEmail,
                    role
                );
                console.log("participants:")
                console.log(response)

                setUsers(response.content);
                setPagesCount(response.totalPages)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId, page, role, searchEmail, searchFirstName, searchLastName]);

    const handleRemove = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            await EventService.deleteUserFromEvent(eventId, userId);
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Failed to remove user:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <ElementAdditionDialog
                size={"md"}
                title={"Participants"}
                content={
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

                                <OpenFiltersButton
                                    isOpenFilterMenu={isOpenFilterMenu}
                                    setOpenFilterMenu={setOpenFilterMenu}
                                />
                            </Box>
                        </Stack>


                        <Divider sx={{mb: 1, mt: 0.5}}/>

                        {isOpenFilterMenu && (
                            <Box sx={{mb: 1}}>
                                <FiltersGroup
                                    filters={[
                                        {
                                            label: "Role",
                                            value: role,
                                            setValue: setRole,
                                            options: roleTypes,
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
                                    <ParticipantBox user={user} handleRemove={handleRemove}/>
                                </Grid>
                            ))}
                        </Grid>

                        {pagesCount > 1 && (
                            <Box sx={{marginTop: "auto"}}>
                                <PaginationBox
                                    page={page}
                                    pagesCount={pagesCount}
                                    setPage={setPage}
                                />
                            </Box>
                        )}


                    </>
                }
                page={page}
                setPage={setPage}
                pagesCount={pagesCount}
                actions={isCreator && <EventInviteContainer eventId={eventId}/>}
            />
        </>
    );
}

export default ParticipantsContainer;