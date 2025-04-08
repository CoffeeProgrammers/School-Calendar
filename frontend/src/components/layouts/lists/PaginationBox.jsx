import {Box, Pagination} from "@mui/material";

const PaginationBox = ({pagesCount, page, setPage}) => {

    const handlePaginationChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box
            sx={{
                mt: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Pagination
                count={pagesCount}
                variant="outlined"
                shape="rounded"
                size="large"
                page={page}
                onChange={handlePaginationChange}
            />
        </Box>
    );
};

export default PaginationBox;