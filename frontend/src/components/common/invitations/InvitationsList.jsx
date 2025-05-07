import {Stack} from '@mui/material';
import InvitationBox from "./InvitationBox";

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
];


const InvitationsList = () => {
    return (
        <Stack spacing={1} mt={-1}>
            {invitationsData.map(invitation => (
                <InvitationBox invitation={invitation}/>
            ))}
        </Stack>
    )
}

export default InvitationsList