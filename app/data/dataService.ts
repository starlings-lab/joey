import { StakingProtocol, StakingProtocolDetails, StakingProtocolSummary } from '../types';
import { getStakingProtocolMapBySlug, getStakingProtocolSlugs } from './staticDataService';

export async function getStakingProtocols(): Promise<StakingProtocolSummary[]> {
  console.log('Fetching staking protocols...');

  // fetch for over 2MB of data can not be cached
  const res = await fetch('https://yields.llama.fi/pools', { cache: 'no-store' });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
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
      stakingProtocol.stakingApy = protocol.apyBase;
      stakingProtocol.netApy = protocol.apy;
      stakingProtocol.tokenRewardsApy = protocol.apyReward || 0;
      stakingProtocol.defiLlamaPoolId = protocol.pool;
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