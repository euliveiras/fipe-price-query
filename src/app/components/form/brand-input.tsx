import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Brand } from "@/models/brand";

type Props = {
  data: Brand[];
  onBrandChange(str: string): void;
  value: string | null;
};

export function BrandInput({ data, onBrandChange, value }: Props) {
  const onChange = (e: SelectChangeEvent) => onBrandChange(e.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel id="vehicle-brand">Marca</InputLabel>
      <Select
        value={value ?? ""}
        labelId="vehicle-brand"
data-testid="brand"
        id="brand"
        label="brand"
        name="brand"
        onChange={onChange}
      >
        {data.map((brand) => (
          <MenuItem key={brand.name} value={brand.code}>
            {brand.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
