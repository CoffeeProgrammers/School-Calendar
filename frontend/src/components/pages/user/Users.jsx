import React, {useEffect, useState} from 'react';
import {Box, Divider, Stack, Typography} from "@mui/material";
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import Search from "../../layouts/lists/Search";
import OpenFiltersButton from "../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import UserService from "../../../services/ext/UserService";
import UserList from "../../common/user/UserList";

const listPanelStyles = {
    alignItems: 'center',
    display: "flex",
    justifyContent: "space-between"
}

const mainBoxStyles = {
    minHeight: "525px", // todo: 3 lines height
    border: '1px solid #ddd',
    padding: '20px 20px 8px 20px',
    margin: '10px',
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column"
};

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

    const [page, setPage] = useState(1);
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
                        searchQuery: searchQuery,
                        role: role
                    }
                );
                setUsers(response.data);
                setPagesCount(response.pages)
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
                <Stack direction="row" mb={1} sx={listPanelStyles}>
                    <Typography variant="h4">Users</Typography>
                    <Box sx={{display: "flex"}} gap={0.5}>
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
