import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Header() {
  return (
    <Box component="header" display={"grid"} gap={1}>
      <Typography
        component="h1"
        typography={"title"}
        marginX={"auto"}
        width={"fit-content"}
      >
        Tabela Fipe
      </Typography>
      <Typography component="h2" typography={"subtitle1"}>
        Consulte o valor de um veículo de forma gratuita
      </Typography>
    </Box>
  );
}

export default function Home() {
  async function createInvoice(formData: FormData) {
    "use server";

    const rawFormData = {
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };

    // mutate data
    // revalidate cache
  }
  return (
    <Box component="main" height={1}>
      <Box height={1} width={1} display="flex" justifyContent="center" p={2}>
        <Box minHeight={100} minWidth={100} paddingTop={10}>
          <Header />
          <Box component="form" display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <InputLabel id="form-vehicle-brand">Marca</InputLabel>
              <Select labelId="form-vehicle-brand" id="brand" label="brand">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="form-vehicle-model">Modelo</InputLabel>
              <Select labelId="form-vehicle-model" id="model" label="model">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
