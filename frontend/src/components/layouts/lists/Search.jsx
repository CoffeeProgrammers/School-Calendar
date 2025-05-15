import React from 'react';
import {TextField} from "@mui/material";

const Search = ({label, searchQuery, setSearchQuery}) => {
    return (
        <TextField
            size="small"
            label= {label ? label : "Search..."}
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
};

export default Search;