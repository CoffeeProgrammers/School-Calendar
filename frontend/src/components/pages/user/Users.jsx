import React, {useEffect, useState} from 'react';
import {Box, Divider, Stack, Typography} from "@mui/material";
import Loading from "../../layouts/Loading";
import PaginationBox from "../../layouts/lists/PaginationBox";
import Search from "../../layouts/lists/Search";
import OpenFiltersButton from "../../layouts/lists/OpenFiltersButton";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import UserService from "../../../services/base/ext/UserService";
import UserList from "../../common/user/UserList";
import {listPanelStyles} from "../../../assets/styles";


const roleTypes = [
    {value: '', label: <em>None</em>},
    {value: 'TEACHER', label: 'Teacher'},
    {value: 'STUDENT', label: 'Student'},
    {value: 'PARENT', label: 'Parents'},

];

const Users = () => {
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
                const response = await UserService.getAllUsers(
                    page - 1,
                    15,
                    searchEmail,
                    searchFirstName,
                    searchLastName,
                    role
                );
                console.log("users:")
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
    }, [searchFirstName, role, page, searchEmail, searchLastName]);


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    return (
        <>
            <Box sx={{
                width: 1500,
                border: '1px solid #ddd',
                padding: '20px',
                margin: '10px',
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column"
            }}>
                <Stack direction="row" sx={listPanelStyles}>
                    <Typography variant="h4">Users</Typography>
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

                <UserList
                    users={users}
                />

                {pagesCount > 1 && (
                    <Box sx={{marginTop: "auto"}}>
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
