import "dotenv/config";

import { QueryParameter, DuneClient } from "@cowprotocol/ts-dune-client";
const { DUNE_API_KEY } = process.env;

const duneClient = new DuneClient(DUNE_API_KEY ?? "");
const queryID = 2425136;
export default async function getLatestData() {
  console.log("Fetching data from Dune...");
  return duneClient
    .refresh(queryID, [])
    .then((executionResult) => {
      console.log(executionResult.result?.rows);
      return executionResult.result?.rows;
    });
}