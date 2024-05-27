"use client";
import Box from "@mui/material/Box";
import { BrandInput } from "./brand-input";
import { useVehicle } from "../hooks/use-vehicle";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { ModelInput } from "./model-input";
import { useState } from "react";
import { YearInput } from "./year-input";
import { useFormState } from "react-dom";
import { Price } from "./price";
import { SubmitButton } from "./submit-button";
import { VehicleNotFounded } from "./vehicle-not-found";
import { Brand } from "@/models/brand";
import { Model } from "@/models/model";
import { Year } from "@/models/year";
import { Vehicle } from "@/models/vehicle";

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
      {result?.ok && result.vehicle && (
        <Price
          vehicle={{
            name: result.vehicle?.model,
            price: result.vehicle?.price,
          }}
        />
      )}
      {result && !result?.ok && <VehicleNotFounded />}
    </>
  );
}
