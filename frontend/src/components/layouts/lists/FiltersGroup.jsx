import {Stack} from "@mui/material";
import FilterSelect from "./FilterSelect";

const FiltersGroup = ({ filters }) => (
    <Stack direction="row" spacing={0.5}>
        {filters.map(({ label, value, setValue, options }) => (
            <FilterSelect
                key={label}
                label={label}
                value={value}
                setValue={setValue}
                options={options}
            />
        ))}
    </Stack>
);

export default FiltersGroup;