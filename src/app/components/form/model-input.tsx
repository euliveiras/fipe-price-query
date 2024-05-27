import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Model } from "@/models/model";

type Props = {
  disabled: boolean;
  onModelChange(str: string): void;
  data: Model[];
  value: string | null;
};

export function ModelInput({ data, value, disabled, onModelChange }: Props) {
  const onChange = (e: SelectChangeEvent) => onModelChange(e.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel id="vehicle-model">Modelo</InputLabel>
      <Select
        labelId="vehicle-model"
data-testid="model"
        id="model"
        name="model"
        label="model"
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
