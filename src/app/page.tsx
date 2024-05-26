import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useVehicle } from "./components/hooks/useVehicle";
import { Form } from "./components/form/container";
import { getVehiclePrice } from "@/services/get-vehicle-price";

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

export default async function Home({
  searchParams,
}: {
  searchParams: { brand?: string; model?: string; year?: string };
}) {
  const { getVehiclebrands, getVehicleModels } = useVehicle();
  const [brands, initialData] = await Promise.all([
    getVehiclebrands(),
    getVehicleModels(searchParams.brand),
  ]);

  async function action(prev: any, form: FormData) {
    "use server";
    const brand = form.get("brand") as string;
    const year = form.get("year") as string;
    const model = form.get("model") as string;

    const data =  await getVehiclePrice({ brand, model, year });
return data
  }

  return (
    <Box component="main" height={1}>
      <Box height={1} width={1} display="flex" justifyContent="center" p={2}>
        <Box
          display="flex"
          flexDirection={"column"}
          gap={2}
          minHeight={100}
          width={1}
          maxWidth={560}
          minWidth={300}
          paddingTop={1}
        >
          <Header />
          <Paper
            component={Box}
            width={0.85}
            paddingX={4}
            paddingBottom={8}
            paddingTop={4}
            marginX={"auto"}
          >
            <Form
              initialData={{
                brands,
                models: initialData.models,
                years: initialData.years,
              }}
              action={action}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
