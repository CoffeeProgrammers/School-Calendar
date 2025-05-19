import React from 'react';
import {Typography} from "@mui/material";
import {listElementBoxTextStyle} from "../../assets/styles";

const Options = ({optionsList, textAlign}) => {
    return (
        <table>
            <tbody>
            {optionsList.map(({icon, label, value}, index) => (
                <tr key={index}>
                    <td style={{paddingRight: "20px"}}>
                        <Typography noWrap variant="body1" color="primary" sx={listElementBoxTextStyle}>
                            {icon}
                            {label}
                        </Typography>
                    </td>
                    <td style={{textAlign: textAlign}}>
                        <Typography component="div">{value}</Typography>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Options;