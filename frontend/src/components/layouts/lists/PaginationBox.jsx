import {Box, Pagination} from "@mui/material";

const PaginationBox = (
    {
        pagesCount,
        page,
        setPage,
        size = 'large',
        siblingCount = 1,
        sx = {}
    }
) => {

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
                ...sx
            }}
        >
            <Pagination
                count={pagesCount}
                variant="outlined"
                shape="rounded"
                siblingCount={siblingCount}
                size={size}
                page={page}
                onChange={handlePaginationChange}
            />
        </Box>
    );
};

export default PaginationBox;