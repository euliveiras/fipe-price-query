"use client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { BrandInput } from "./brand-input";
import { Brand, Model, Vehicle, Year, useVehicle } from "../hooks/useVehicle";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { ModelInput } from "./model-input";
import { useState } from "react";
import { YearInput } from "./year-input";
import { useFormState, useFormStatus } from "react-dom";
import { green } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";

type PriceProps = {
  vehicle: { name: string; price: string };
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type={pending ? "button" : "submit"}
      variant="contained"
      color="secondary"
      disabled={disabled}
      sx={{
        width: "fit-content",
        paddingX: 8,
        marginX: "auto",
        marginTop: 1,
      }}
    >
      {pending ? <CircularProgress size={28} color="inherit" /> : "Consultar"}
    </Button>
  );
}

function Price({ vehicle }: PriceProps) {
  return (
    <Stack
      width={1}
      sx={{ backgroundColor: green[400], borderRadius: 1, p: 1 }}
      alignItems={"center"}
      gap={1}
      mt={3}
    >
      <Typography
        variant="title"
        component="h2"
        width={"fit-content"}
        fontSize={"1.5rem"}
        textAlign={"center"}
      >
        Tabela Fipe: Preço {vehicle.name}
      </Typography>
      <Typography
        width={"fit-content"}
        fontWeight={"bold"}
        py={1}
        px={2}
        sx={{ backgroundColor: green["600"], borderRadius: 100 }}
      >
        {vehicle.price}
      </Typography>
      <Typography variant="caption" width={"fit-content"}>
        Este é o preço de compra do veículo
      </Typography>
    </Stack>
  );
}

type Props = {
  initialData: {
    brands: Brand[];
    models: Model[];
    years: Year[];
  };
  action(
    prev: any,
    data: FormData,
  ): Promise<{ ok: boolean; vehicle?: Vehicle } | null>;
};

export function Form({ initialData, action }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getVehicleModels } = useVehicle();
  const [result, formAction] = useFormState(action, null);

  const [filters, setFilters] = useState(() => {
    const brand = searchParams.get("brand");
    const model = searchParams.get("model");
    const year = searchParams.get("year");

    return { brand, model, year };
  });
  const [models, setModels] = useState<Model[]>(initialData.models);
  const [years, setYears] = useState<Year[]>(initialData.years);

  const onBrandChange = async (e: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("brand", e);

    const { models, years } = await getVehicleModels(e);

    setModels(models);
    setYears(years);
    setFilters({ brand: e, model: "", year: "" });
    params.delete("model");
    params.delete("year");
    router.push(pathname + "?" + params);
  };

  const onModelChange = (e: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("model", e);

    setFilters((f) => ({ ...f, model: e, year: "" }));
    router.push(pathname + "?" + params);
  };

  const onYearChange = (e: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", e);

    setFilters((f) => ({ ...f, year: e }));
    router.push(pathname + "?" + params);
  };

  return (
    <>
      <Box
        action={formAction}
        component="form"
        display="flex"
        flexDirection="column"
        gap={2}
        width={1}
      >
        <BrandInput
          data={initialData.brands}
          onBrandChange={onBrandChange}
          value={filters.brand}
        />
        <ModelInput
          data={models}
          onModelChange={onModelChange}
          disabled={!filters.brand}
          value={filters.model}
        />
        <YearInput
          data={years}
          onYearChange={onYearChange}
          disabled={!filters.brand}
          value={filters.year}
        />
        <SubmitButton
          disabled={!filters.brand || !filters.model || !filters.year}
        />
      </Box>
      {result && result.ok
        ? result.vehicle && (
            <Price
              vehicle={{
                name: result.vehicle?.model,
                price: result.vehicle?.price,
              }}
            />
          )
        : "nada encontrado"}
    </>
  );
}
