import "dotenv/config";

const { DUNE_API_KEY } = process.env;

// Dune query id for TVL and APY data
const TVL_APY_QUERY_ID = 2750230;
const HOUR_IN_SECONDS = 60 * 60;

export async function getLsdFiTvlAndApy(): Promise<Record<string, unknown>[]> {
  const duneEndpoint = `https://api.dune.com/api/v1/query/${TVL_APY_QUERY_ID}/results`;
  console.log("Fetching TVL and APY data from Dune endpoint: " + duneEndpoint);

  const header = new Headers();
  header.append('x-dune-api-key', DUNE_API_KEY ?? '');

  //  Call the Dune API and cache the result for 1 hour
  return fetch(duneEndpoint, { method: 'GET', headers: header, next: { revalidate: HOUR_IN_SECONDS } })
    .then((response) => response.json()
      .then((data) => data.result?.rows ?? []));
}