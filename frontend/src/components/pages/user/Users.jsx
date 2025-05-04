import React, {useEffect, useState} from 'react';
import {Box, Divider, Stack, Typography} from "@mui/material";
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import Search from "../../layouts/lists/Search";
import OpenFiltersButton from "../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import UserService from "../../../services/base/ext/UserService";
import UserList from "../../common/user/UserList";
import {listPanelStyles, mainBoxStyles} from "../../../assets/styles";


const eventTypes = [
    {value: '', label: <em>None</em>},
    {value: 'teacher', label: 'Teacher'},
    {value: 'student', label: 'Student'},
    {value: 'parents', label: 'Parents'},

];

const Users = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [role, setRole] = useState('');

    const [users, setUsers] = useState([])

    const [page, setPage] = useState(0);
    const [pagesCount, setPagesCount] = useState(1)

    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserService.getAllUsers(
                    {
                        page: page,
                        size: 15,
                    }
                );
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
    }, [searchQuery, role, page]);


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Box sx={mainBoxStyles}>
                <Stack direction="row" sx={listPanelStyles}>
                    <Typography variant="h4">Users</Typography>
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

                <UserList
                    users={users}
                />

                {pagesCount > 1 && (
                    <Box sx={{ marginTop: "auto" }}>
                        <PaginationBox
                            page={page}
                            pagesCount={pagesCount}
                            setPage={setPage}
                        />
                    </Box>
                )}


            </Box>
        </>
    );
};

export default Users;
