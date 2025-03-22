import React from 'react';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {IconButton} from "@mui/material";

const OpenFiltersButton = ({setOpenFilterMenu, isOpenFilterMenu}) => {
    return (
        <IconButton
            onClick={() => setOpenFilterMenu(!isOpenFilterMenu)}
        >
            <FilterAltIcon
                color="primary"
                fontSize="medium"
            />
        </IconButton>
    );
};

export default OpenFiltersButton;