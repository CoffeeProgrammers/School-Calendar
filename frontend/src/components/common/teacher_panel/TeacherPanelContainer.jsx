import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    Divider,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import UserService from "../../../services/base/ext/UserService";
import Loading from "../../layouts/Loading";
import Search from "../../layouts/lists/Search";
import FiltersGroup from "../../layouts/lists/FiltersGroup";
import {roleTypes} from "../../../utils/constants";
import PaginationBox from "../../layouts/lists/PaginationBox";
import {useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupsIcon from '@mui/icons-material/Groups';
import TagIcon from '@mui/icons-material/Tag';
import {listPanelStyles} from "../../../assets/styles";
import CreateUserDialog from "../user/create/CreateUserDialog";
import TextUtils from "../../../utils/TextUtils";
import {useError} from "../../../contexts/ErrorContext";

const TeacherPanelContent = () => {
    const {showError} = useError()
    const navigate = useNavigate();

    const [users, setUsers] = useState([])

    const [searchFirstName, setSearchFirstName] = useState('');
    const [searchLastName, setSearchLastName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');


    const [role, setRole] = useState('');

    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserService.getAllUsers(
                    page - 1,
                    10,
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

    useEffect(() => {
        setPage(1);
    }, [searchFirstName, searchLastName, searchEmail, role]);

    const handleDelete = async (e, userId) => {
        e.stopPropagation();
        try {
            await UserService.deleteUser(userId);
            setUsers(prev => prev.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Failed to delete user:", error);
            showError(error);
        }
    };

    const handleCreate = async (date) => {
        try {
            const response = await UserService.createUser(date);
            setUsers(prev => [...prev, response]);
        } catch (error) {
            console.error("Failed to create user:", error);
            showError(error);
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Typography color={"error"}>Error: {error.message}</Typography>;
    }

    const columns = [
        {
            id: 'number',
            label: <Box mt={0.8} ml={-0.35}><TagIcon fontSize='small'/></Box>,
            render: (_, i) => (page - 1) * 10 + i + 1
        },
        {
            id: 'firstName',
            label: <Search
                label={"First Name"}
                searchQuery={searchFirstName}
                setSearchQuery={setSearchFirstName}
            />,
            render: user => user.firstName
        },
        {
            id: 'lastName',
            label: <Search
                label={"Last Name"}
                searchQuery={searchLastName}
                setSearchQuery={setSearchLastName}
            />,
            render: user => user.lastName
        },
        {
            id: 'email',
            label: <Search
                label={"Email"}
                searchQuery={searchEmail}
                setSearchQuery={setSearchEmail}
            />,
            render: user => user.email
        },
        {
            id: 'role',
            label: <FiltersGroup
                filters={[
                    {
                        label: "Role",
                        value: role,
                        setValue: setRole,
                        options: roleTypes,
                        type: "select"
                    }
                ]}
            />,
            render: user => TextUtils.formatEnumText(user.role)
        },
        {
            id: 'actions',
            label:

                    <CreateUserDialog handleCreate={handleCreate}/>,
            align: 'center',
            render: (user) => (
                <IconButton size="small" onClick={(e) => handleDelete(e, user.id)}>
                    <DeleteIcon sx={{color: 'secondary.main'}}/>
                </IconButton>
            )
        }
    ];

    return (
        <Container maxWidth={"md"}>
            <Container maxWidth={"md"}>
                <Box sx={{width: "100%"}}>
                    <Box sx={{
                        border: '1px solid #ddd',
                        padding: '20px',
                        margin: '10px',
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column"
                    }}>


                        <Stack direction="row" sx={listPanelStyles}>
                            <Box sx={{display: 'flex', alignItems: 'top', gap: 0.5}}>
                                <Box mt={0.6}>
                                    <GroupsIcon fontSize="large" color="secondary"/>
                                </Box>
                                <Typography variant="h4">Users</Typography>
                            </Box>

                        </Stack>

                        <Divider sx={{mb: 0.3}}/>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map(col => (
                                            <TableCell key={col.id} align={col.align || "left"} sx={{padding: "5px"}}>
                                                {col.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, index) => (
                                        <TableRow
                                            key={user.id}
                                            hover
                                            sx={{cursor: 'pointer', height: "36px"}}
                                            onClick={() => navigate(`/users/${user.id}`)}
                                        >
                                            {columns.map(col => (
                                                <TableCell key={col.id} align={col.align || "left"}
                                                           sx={{padding: "8px"}}>
                                                    {col.render(user, index)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

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
                </Box>
            </Container>
        </Container>
    );
};

export default TeacherPanelContent;