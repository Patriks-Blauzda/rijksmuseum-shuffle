// Exportable API key to the Rijksstudio API for use in components
// Be sure to set this to a valid API key
export const api_key: string = "";

// Makes a GET request to target URL, expected to be used in useEffect() hook
export default async function makeAPICall(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // console.error(`Error code ${response.status}: ${response.statusText}`);
      throw response;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
