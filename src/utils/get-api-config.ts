export function getApiConfig() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

  if (!apiUrl) throw new Error("Api url is invalid");

  return { apiUrl };
}
