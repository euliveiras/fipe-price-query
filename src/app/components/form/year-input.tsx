import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Year } from "../hooks/useVehicle";

type Props = {
  disabled: boolean;
  onYearChange(str: string): void;
  data: Year[];
  value: string | null;
};

export function YearInput({ data, value, disabled, onYearChange }: Props) {
  const onChange = (e: SelectChangeEvent) => onYearChange(e.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel id="vehicle-year">Ano</InputLabel>
      <Select
        labelId="vehicle-year"
        id="year"
        name="year"
        label="year"
        disabled={disabled}
        onChange={onChange}
        value={value ?? ""}
      >
        {data.map((d) => (
          <MenuItem key={d.code} value={d.code}>
            {d.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
