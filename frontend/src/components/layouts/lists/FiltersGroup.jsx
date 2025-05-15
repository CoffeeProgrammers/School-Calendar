import {Stack} from "@mui/material";
import FilterSelect from "./FilterSelect";
import GreenDatePicker from "../GreenDatePicker";
import dayjs from "dayjs";

const FiltersGroup = ({filters}) => (
    <Stack direction="row" spacing={0.5}>
        {filters.map(({label, value, setValue, options, type}) =>
            type === "date" ? (
                <GreenDatePicker
                    key={label}
                    label={label}
                    value={dayjs(value)}
                    setValue={setValue}
                />
            ) : (type === "select" && (
                    <FilterSelect
                        key={label}
                        label={label}
                        value={value}
                        setValue={setValue}
                        options={options}
                    />)
            )
        )}
    </Stack>
);

export default FiltersGroup;