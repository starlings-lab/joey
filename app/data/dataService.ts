import { LSDFiStrategySummary, StakingProtocolSummary } from '../types';
import { getLsdFiTvlAndApy } from './duneDataService';
import { getLSDFiStrategyFeaturesById, getLSDFiStrategyDisplayNameById, getStakingProtocolMapBySlug } from './staticDataService';
import { getLsdFiStrategyIdByName } from './staticDataService';

export async function getStakingProtocols(): Promise<StakingProtocolSummary[]> {
  console.log('Fetching staking protocols...');

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
  response.data.forEach((protocol: any) => {
    if (protocol.chain === 'Ethereum' && protocolMapBySlug.has(protocol.project)) {
      const stakingProtocol = protocolMapBySlug.get(protocol.project)!;
      stakingProtocol.tvl = protocol.tvlUsd;
      stakingProtocol.stakingApy = protocol.apyBase || protocol.apy;
      stakingProtocol.netApy = protocol.apy;
      stakingProtocol.tokenRewardsApy = protocol.apyReward || 0;
      stakingProtocol.defiLlamaPoolId = protocol.pool;

      // console.log('Fetched staking protocol: ' + JSON.stringify(stakingProtocol));
    }
  });

  return Array.from(protocolMapBySlug.values());
}

export async function getStakingProtocolSummary(poolId: string) {
  const stakingProtocols = await getStakingProtocols();
  return stakingProtocols.find((protocol) => protocol.defiLlamaPoolId === poolId);
}

export async function getTvlAndApyHistory(poolId: string): Promise<any[]> {
  const endpoint = 'https://yields.llama.fi/chart/' + poolId;
  console.log('Fetching TVL and APY history using endpoint: ' + endpoint);

  const res = await fetch(endpoint, { cache: 'no-store' });

  // Recommendation: handle errors
  if (!res.ok) {
    console.log(res);
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch TVL and APY history data');
  }

  const response = await res.json();

  if (response.status !== 'success') {
    throw new Error('Failed to fetch TVL and APY history data for');
  }

  return response.data;
}

export async function getLSDFiStrategies() {
  return getLsdFiTvlAndApy()
    .then(tvlApyRows => {
      console.log(tvlApyRows);
      const LSDFiStrategies: LSDFiStrategySummary[] = tvlApyRows
        .map((row: any) => {
          const id = getLsdFiStrategyIdByName(row["name"])!;
          return {
            id: id,
            name: getLSDFiStrategyDisplayNameById(id),
            tvl: row.tvlUSD,
            netApy: row.APY,
            stakingApy: 0,
            tokenRewardsApy: 0,
            fees: 0,
            features: getLSDFiStrategyFeaturesById(id)
          }
        });

      console.log(LSDFiStrategies);
      return LSDFiStrategies;
    });
}