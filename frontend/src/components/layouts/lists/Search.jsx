import React from 'react';
import {TextField} from "@mui/material";

const Search = ({searchQuery, setSearchQuery}) => {
    return (
        <TextField
            size="small"
            label="Search events..."
            variant="filled"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
};

export default Search;