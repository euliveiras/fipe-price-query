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
  const { apiUrl } = getApiConfig();
  const url = new URL(
    `${apiUrl}/carros/marcas/${brand}/modelos/${model}/anos/${year}`,
  );
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
