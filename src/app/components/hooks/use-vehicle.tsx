import { BrandsMapper } from "@/mappers/brands-mapper";
import { getApiConfig } from "../../../utils/get-api-config";
import { ModelMapper } from "@/mappers/models-mapper";
import { YearMapper } from "@/mappers/year-mapper";
import { Brand } from "@/models/brand";
import { Model } from "@/models/model";
import { Year } from "@/models/year";

export function useVehicle() {
  const { apiUrl } = getApiConfig();

  const getVehiclebrands = async (): Promise<Brand[]> => {
    const url = new URL(apiUrl + "/carros/marcas");
    const res = await fetch(url);
    const json = await res.json();

    return json.map((brand: { codigo: string; nome: string }) =>
      BrandsMapper.toFront(brand),
    );
  };

  const getVehicleModels = async (
    e: string | null | undefined,
  ): Promise<{ models: Model[]; years: Year[] }> => {
    if (!e) return { models: [], years: [] };

    const url = new URL(`${apiUrl}/carros/marcas/${e}/modelos`);
    const res = await fetch(url);
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
