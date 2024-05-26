export function getApiConfig() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN ?? "";

  if (!apiUrl) throw new Error("Api url is invalid");
  if (!apiToken) throw new Error("Api token is invalid");

  return { apiUrl, apiToken };
}
