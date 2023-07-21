import { ApyDataPoint, LSDFiStrategySummary, StakingProtocolSummary, TvlDataPoint } from '../types';
import { getStakingProtocolMapBySlug, getLSDFiStrategyMapBySlug } from './staticDataService';

const DEFILLAMA_PROTOCOL_ENDPOINT = 'https://api.llama.fi/updatedProtocol/';

export async function getStakingProtocolsAndStrategies():
  Promise<[StakingProtocolSummary[], LSDFiStrategySummary[]]> {
  console.log('Fetching staking protocols & LSDFi strategies...');

  // fetch for over 2MB of data can not be cached
  const res = await fetch('https://yields.llama.fi/pools', { cache: 'no-store' });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const response = await res.json();

  if (response.status !== 'success') {
    throw new Error('Failed to fetch data')
  }

  const protocolMapBySlug = getStakingProtocolMapBySlug();
  const strategyMapBySlug = getLSDFiStrategyMapBySlug();

  const dataFetchCountRequired = protocolMapBySlug.size + strategyMapBySlug.size;
  let dataFetchCount = 0;

  // Iterate over the response data and update the tvl and apy for supported protocols and strategies
  response.data.forEach((protocol: any, index: number) => {
    if (protocol.chain === 'Ethereum') {
      let summary: StakingProtocolSummary | LSDFiStrategySummary | undefined = protocolMapBySlug.get(protocol.project);

      if (!summary) {
        summary = strategyMapBySlug.get(protocol.project);
      }

      let skip = false;
      if (protocol.project === 'unsheth') {
        // skip the USH-WETH pool
        skip = protocol.symbol !== 'UNSHETH';
      }

      if (!skip && summary) {
        summary.tvl = protocol.tvlUsd;
        summary.stakingApy = protocol.apyBase || protocol.apy;
        summary.netApy = protocol.apy;
        summary.tokenRewardsApy = protocol.apyReward || 0;
        summary.defiLlamaPoolId = protocol.pool;

        dataFetchCount++;
        // console.log('Fetched staking protocol: ' + JSON.stringify(protocol) + ' at index: ' + index);
      }
    }

    // break out of the loop if we have fetched all the data we need
    if (dataFetchCount === dataFetchCountRequired) {
      return;
    }
  });

  // update TVL data from updated defillama protocol end point
  const dataPromisMapBySlug = new Map<string, Promise<Response>>();
  Array.from(protocolMapBySlug.keys()).forEach((slug) => dataPromisMapBySlug.set(slug, fetch(`${DEFILLAMA_PROTOCOL_ENDPOINT}${slug}`)));
  Array.from(strategyMapBySlug.keys()).forEach((slug) => dataPromisMapBySlug.set(slug, fetch(`${DEFILLAMA_PROTOCOL_ENDPOINT}${slug}`)));

  // wait for all the data to be fetched
  await Promise.all(dataPromisMapBySlug.values());
  for (const [slug, dataPromise] of dataPromisMapBySlug.entries()) {
    const dataResponse = await dataPromise;
    const data = await dataResponse.json();
    // console.log('Fetched TVL: ' + data.currentChainTvls.Ethereum + ' for slug: ' + slug);
    const summary: StakingProtocolSummary | LSDFiStrategySummary | undefined = protocolMapBySlug.get(slug) || strategyMapBySlug.get(slug);
    if (summary) {
      summary.tvl = data.currentChainTvls.Ethereum;
    }
  }

  // console.log('Fetched staking protocols & LSDFi strategies: ' + dataFetchCount + ' out of ' + dataFetchCountRequired);
  return [Array.from(protocolMapBySlug.values()), Array.from(strategyMapBySlug.values())];
}

// Staking protocols tvl and apy based on DefiLlama data
export async function getStakingProtocols(): Promise<StakingProtocolSummary[]> {
  return getStakingProtocolsAndStrategies()
    .then(([stakingProtocols, _ignore]) => stakingProtocols);
}

// LSDFi strategies tvl and apy based on DefiLlama data
export async function getLSDFiStrategies(): Promise<LSDFiStrategySummary[]> {
  return getStakingProtocolsAndStrategies()
    .then(([_ignore, lsdFiStrategies]) => lsdFiStrategies);
}

export async function getStakingProtocolSummary(protocolName: string) {
  const stakingProtocols = await getStakingProtocols();
  return stakingProtocols.find((protocol) => protocol.name === protocolName);
}

export async function getTvlAndApyHistory(protocolOrStrategyName: string, strategy: boolean = false):
  Promise<[TvlDataPoint[], ApyDataPoint[]]> {
  let summary: StakingProtocolSummary | LSDFiStrategySummary | undefined;
  if (strategy) {
    const strategies = await getLSDFiStrategies();
    summary = strategies.find((strategy) => strategy.name === protocolOrStrategyName);
  } else {
    const protocols = await getStakingProtocols();
    summary = protocols.find((protocol) => protocol.name === protocolOrStrategyName);
  }

  if (!summary) {
    throw new Error('Failed to fetch TVL and APY history data for ' + protocolOrStrategyName);
  }

  const endpoint = 'https://yields.llama.fi/chart/' + summary?.defiLlamaPoolId;
  console.log('Fetching TVL and APY history using endpoint: ' + endpoint);

  const [apyResponse, tvlResponse] = await Promise.all([
    fetch(endpoint, { cache: 'no-store' }),
    fetch(`${DEFILLAMA_PROTOCOL_ENDPOINT}${summary.defiLlamaProject}`)
  ]);

  // Recommendation: handle errors
  if (!apyResponse.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch APY history data for' + protocolOrStrategyName);
  }

  // process APY history response
  const apyData = await apyResponse.json();

  if (apyData.status !== 'success') {
    throw new Error('Failed to fetch APY history data for ' + protocolOrStrategyName);
  }

  const apyHistory = apyData.data.map((dataPoint: any) => {
    return {
      timestamp: dataPoint.timestamp,
      apy: dataPoint.apy
    };
  });

  // process TVL history response
  if (!tvlResponse.ok) {
    throw new Error('Failed to fetch TVL history data for ' + protocolOrStrategyName);
  }

  const tvlData = await tvlResponse.json();
  const tvlHistory = tvlData.chainTvls.Ethereum.tvl.map((dataPoint: any) => {
    return {
      timestamp: new Date(dataPoint.date * 1000),
      tvlUsd: dataPoint.totalLiquidityUSD
    };
  });

  return [tvlHistory, apyHistory];
}

// Dune Analytics based TVL and APY
// export async function getLSDFiStrategies() {
//   return getLsdFiTvlAndApy()
//     .then(tvlApyRows => {
//       return tvlApyRows
//         .map((row: any) => {
//           const id = getLsdFiStrategyIdByName(row["name"])!;
//           return {
//             id: id,
//             name: getLSDFiStrategyDisplayNameById(id),
//             tvl: row.tvlUSD,
//             netApy: row.APY,
//             stakingApy: 0,
//             tokenRewardsApy: 0,
//             fees: getLSDFiFeeById(id),
//             features: getLSDFiStrategyFeaturesById(id),
//             logoUrl: getLSDFiStrategyDisplayNameById(id)
//           }
//         });
//     });
// }

export async function getLSDFiStrategySummary(strategyName: string) {
  const lsdFiStrategies = await getLSDFiStrategies();
  return lsdFiStrategies.find((strategy) => strategy.name === strategyName);
}
