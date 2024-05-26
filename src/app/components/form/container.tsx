"use client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { BrandInput } from "./brand-input";
import { Brand, Model, Year, useVehicle } from "../hooks/useVehicle";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { ModelInput } from "./model-input";
import { useState } from "react";
import { YearInput } from "./year-input";
import { useFormState } from "react-dom";

type Props = {
  initialData: {
    brands: Brand[];
    models: Model[];
    years: Year[];
  };
  action(data: FormData): FormData;
};

export function Form({ initialData, action }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getVehicleModels } = useVehicle();
  const [result, formAction] = useFormState(action, new FormData());

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

console.log("h", result)

  return (
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
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={!filters.brand || !filters.model || !filters.year}
        sx={{
          width: "fit-content",
          paddingX: 8,
          marginX: "auto",
          marginTop: 3,
        }}
      >
        Consultar
      </Button>
    </Box>
  );
}
