import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useVehicle } from "./components/hooks/use-vehicle";
import { Form } from "./components/form/container";
import { getVehiclePrice } from "@/services/get-vehicle-price";
import Link from "@mui/material/Link";
import { ColorSwitch } from "./components/color-switch";
import { Header } from "./components/header";

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

    const data = await getVehiclePrice({ brand, model, year });
    return data;
  }

  return (
    <Box component="main" height={1} position={"relative"}>
      <ColorSwitch />
      <Box height={1} width={1} display="flex" justifyContent="center" p={1}>
        <Box
          display="flex"
          flexDirection={"column"}
          gap={1}
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
            paddingBottom={5}
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
      <Link
        href="https://github.com/euliveiras"
        target="__blank"
        rel="noopener"
        color={"inherit"}
        fontSize={"0.8rem"}
        fontStyle={"italic"}
        position={"absolute"}
        left={2}
        bottom={2}
        sx={{ textDecoration: "underline" }}
      >
        builded by euliveiras
      </Link>
    </Box>
  );
}
