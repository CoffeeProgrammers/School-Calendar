
const CustomEvent = ({ event }) => {
    return (
        <div style={{
            backgroundColor: '#ffffff',
            color: 'black',
            padding: '5px 10px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            border: '1px solid #115293',
            cursor: 'pointer',
        }}>
            <div>{event.title}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{event.resource?.type}</div>
        </div>
    );
};
