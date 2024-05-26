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
    `${apiUrl}/cars/brands/${brand}/models/${model}/years/${year}`,
  );
  const headers = new Headers({ "X-Subscription-Token": apiToken });
  const res = await fetch(url, { headers });
  const json = await res.json();
  return json;
}
