import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardContent, Stack, CardHeader, Button } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const invitationsData = [
    {
        id: 1,
        creator: {
            id: 101,
            email: 'user1@example.com',
            role: 'teacher',
            first_name: 'Іван',
            last_name: 'Петренко',
        },
        event: {
            id: 201,
            name: 'Батьківські збори 9-А класу',
            type: 'meeting',
            start_date: '18:30',
            end_date: '19:30',
            meeting_type: 'offline',
            place: 'Актова зала',
            event_date: '05-17',
        },
        description: 'Просимо бути присутніми на важливих батьківських зборах щодо підсумків навчального року.',
        warning: 'Увага! Цей захід заплановано на той самий час, що й батьківські збори 9-Б класу.',
        date: '05-17 18:30',
    },
    {
        id: 2,
        creator: {
            id: 102,
            email: 'admin@school.ua',
            role: 'admin',
            first_name: 'Ольга',
            last_name: 'Сидоренко',
        },
        event: {
            id: 202,
            name: 'Конференція вчителів області',
            type: 'conference',
            start_date: '10:00',
            end_date: '16:00',
            meeting_type: 'online',
            place: 'Платформа Zoom',
            event_date: '05-22',
        },
        description: 'Запрошуємо на щорічну конференцію вчителів з обміну досвідом та обговорення нових методик.',
        warning: false,
        date: '05-22 10:00',
    },
    {
        id: 3,
        creator: {
            id: 103,
            email: 'sportclub@school.ua',
            role: 'coordinator',
            first_name: 'Андрій',
            last_name: 'Коваленко',
        },
        event: {
            id: 203,
            name: 'Товариський матч з футболу',
            type: 'sport',
            start_date: '15:00',
            end_date: '17:00',
            meeting_type: 'offline',
            place: 'Шкільний стадіон',
            event_date: '05-25',
        },
        description: 'Запрошуємо учнів та вчителів на товариський матч між командами старшої та середньої школи.',
        warning: 'Можливе часткове перетинання з часом роботи гуртка з шахів.',
        date: '05-25 15:00',
    },
    // Можна додати більше об'єктів запрошень
];



const GenerationInvitations = () => {
    return (
        <Stack spacing={1} mt={-1}>
            {invitationsData.map(invitation => (
                <Card variant='outlined' sx={{ borderRadius: "10px" }}>
                    <Box mb={-2}>
                        <CardHeader
                            titleTypographyProps={{ fontSize: "18px" }}
                            subheaderTypographyProps={{ color: "gray" }}
                            avatar={
                                <AccountCircleIcon sx={{ fontSize: "40px" }} color="secondary" />
                            }
                            title={invitation.creator.first_name + " " + invitation.creator.last_name}
                            subheader={invitation.date}
                            sx={{ paddingBottom: "0" }}
                        />
                        <CardContent
                            sx={{ paddingTop: "10px" }}
                        >
                            <Typography>{invitation.event.name + ". " + invitation.event.start_date + " -> " + invitation.event.end_date}</Typography>
                            <Typography mt={1}>{"Description: " + invitation.description}</Typography>
                            {invitation.warning && (
                                <Box mt={1} p={2} bgcolor={"#d11507"} color={"#fff"} borderRadius={"10px"}>
                                    <Typography>Warning</Typography>
                                    <Typography>{invitation.warning}</Typography>
                                </Box>
                            )}
                            <Box mt={1} sx={{ display: 'flex', justifyContent: 'end' }}>
                                <Button variant="contained" sx={{
                                    marginRight: "10px",
                                    backgroundColor: "red[700]",
                                    '&:hover': { backgroundColor: "red[500]" },
                                    color: "white",
                                }}>
                                    Reject
                                </Button>
                                <Button variant="contained" sx={{
                                    backgroundColor: 'secondary.main',
                                    '&:hover': { backgroundColor: 'secondary.light' },
                                    color: "white",
                                }}>
                                    Accept
                                </Button>
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            ))
            }
        </Stack>
    )
}

export default GenerationInvitations