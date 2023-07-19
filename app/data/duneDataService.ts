import "dotenv/config";

import { QueryParameter, DuneClient } from "@cowprotocol/ts-dune-client";
const { DUNE_API_KEY } = process.env;

const duneClient = new DuneClient(DUNE_API_KEY ?? "");
const queryID = 2741805;
export default async function getOEth30DayMovingApr() {
  console.log("Fetching data from Dune...");
  return duneClient
    .refresh(queryID, [])
    .then((executionResult) => {
      console.log(executionResult.result?.rows);
      return executionResult.result?.rows;
    });
}