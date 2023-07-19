import "dotenv/config";

import { DuneClient } from "@cowprotocol/ts-dune-client";
import { LSDFiStrategy } from "../types";
const { DUNE_API_KEY } = process.env;

// Dune query id for TVL and APY data
const TVL_APY_QUERY_ID = 2750230;


const duneClient = new DuneClient(DUNE_API_KEY ?? "");

export async function getLsdFiTvlAndApy(): Promise<Record<string, unknown>[]> {
  const duneEndpoint = `https://api.dune.com/api/v1/query/${TVL_APY_QUERY_ID}/results`;
  console.log("Fetching TVL and APY data from Dune endpoint: " + duneEndpoint);

  const header = new Headers();
  header.append('x-dune-api-key', DUNE_API_KEY ?? '');

  //  Call the Dune API
  return fetch(duneEndpoint, { method: 'GET', headers: header })
    .then((response) => response.json()
      .then((data) => data.result?.rows ?? []));
}