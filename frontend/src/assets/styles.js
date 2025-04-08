
export const listElementBoxStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    borderRadius: "10px",
    transition: "background-color 0.4s, border-color 0.4s, box-shadow 0.4s",
    "&:hover": {
        cursor: "pointer",
        bgcolor: "#f0f0f0",
        borderColor: "#999",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    }
}

export const listElementBoxTextStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5
}

export const listPanelStyles = {
    alignItems: 'center',
    display: "flex",
    justifyContent: "space-between "
}

export const mainBoxStyles = {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '10px',
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column"
};