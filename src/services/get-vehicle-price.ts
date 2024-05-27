import { VehicleMapper } from "@/mappers/VehicleMapper";
import { getApiConfig } from "@/utils/get-api-config";

export async function getVehiclePrice({
  brand,
  model,
  year,
}: {
  model: string;
  year: string;
  brand: string;
}) {
  const { apiUrl, apiToken } = getApiConfig();
  const url = new URL(
    `${apiUrl}/carros/marcas/${brand}/modelos/${model}/anos/${year}`,
  );
  const headers = new Headers({ "X-Subscription-Token": apiToken });
  const res = await fetch(url, { headers });
  const json = await res.json();
  if (res.status < 200 || res.status >= 300) {
    return { ok: false };
  }
  return { ok: true, vehicle: VehicleMapper.toFront(json) };
}
