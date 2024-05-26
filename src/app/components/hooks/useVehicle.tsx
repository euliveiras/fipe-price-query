import { BrandsMapper } from "@/mappers/BrandsMapper";
import { getApiConfig } from "../../../utils/get-api-config";
import { ModelMapper } from "@/mappers/ModelsMapper";
import { YearMapper } from "@/mappers/YearMapper";

export type Brand = {
  code: string;
  name: string;
};

export type Model = {
  code: string;
  name: string;
};

export type Year = {
  code: string;
  name: string;
};

export function useVehicle() {
  const { apiUrl, apiToken } = getApiConfig();
  const headers = new Headers({ "X-Subscription-Token": apiToken });

  const getVehiclebrands = async (): Promise<Brand[]> => {
    const url = new URL(apiUrl + "/cars/brands");
    const res = await fetch(url, { headers });
    const json = await res.json();

    return json.map((brand: { code: string; name: string }) =>
      BrandsMapper.toFront(brand),
    );
  };

  const getVehicleModels = async (
    e: string | null | undefined,
  ): Promise<{ models: Model[]; years: Year[] }> => {
    if (!e) return { models: [], years: [] };

    const url = new URL(`${apiUrl}/cars/brands/${e}/models`);
    const res = await fetch(url, { headers });
    const json = await res.json();

    return {
      models: json.modelos.map((a: { codigo: string; nome: string }) =>
        ModelMapper.toFront(a),
      ),
      years: json.anos.map((a: { codigo: string; nome: string }) =>
        YearMapper.toFront(a),
      ),
    };
  };

  return { getVehiclebrands, getVehicleModels };
}
