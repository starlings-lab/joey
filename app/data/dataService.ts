import { StakingProtocol, StakingProtocolDetails, StakingProtocolSummary } from '../types';

// protocols that we are interested in and its DefiLlama project name/slug
const protocolSlugs = ['lido', 'frax-ether', 'rocket-pool', 'coinbase-wrapped-staked-eth', 'stakewise'];
const protocolMapBySlug = new Map<string, StakingProtocolSummary>();

// pre-populate the map with supported protocols
protocolSlugs.forEach((slug: string) => {
  const stakingProtocol: StakingProtocolSummary = {
    id: StakingProtocol.Lido,
    name: '',
    tvl: 0,
    netApy: 0,
    stakingApy: 0,
    tokenRewardsApy: 0,
    fees: 0,
    logoUrl: ''
  };

  switch (slug) {
    case 'lido':
      stakingProtocol.id = StakingProtocol.Lido;
      stakingProtocol.name = 'Lido';
      stakingProtocol.logoUrl = 'https://icons.llama.fi/lido.png';

      // Lido takes 10% fee on users staking rewards
      // Source: https://docs.lido.fi/#protocol-fee
      stakingProtocol.fees = 10;
      break;
    case 'frax-ether':
      stakingProtocol.id = StakingProtocol.FraxEther;
      stakingProtocol.name = 'Frax ETH';
      stakingProtocol.logoUrl = 'https://icons.llama.fi/frax-ether.jpg';

      // Source: https://exponential.fi/assets/b8956e66-fe6c-4a88-8e96-530e2e7dea4c
      stakingProtocol.fees = 10;
      break;
    case 'rocket-pool':
      stakingProtocol.id = StakingProtocol.RocketPool;
      stakingProtocol.name = 'Rocket Pool';
      stakingProtocol.logoUrl = 'https://icons.llama.fi/rocket-pool.jpg';

      // TODO: how do we display 0.05% of deposit fee when ETH is depsoited through protocol?
      // Source: https://twitter.com/Rocket_Pool/status/1506519957986758659
      stakingProtocol.fees = 15;

      break;
    case 'coinbase-wrapped-staked-eth':
      stakingProtocol.id = StakingProtocol.Coinbase;
      stakingProtocol.name = 'Coinbase';
      stakingProtocol.logoUrl = 'https://icons.llama.fi/coinbase-wrapped-staked-eth.png';

      // Source: https://help.coinbase.com/en/coinbase/trading-and-funding/pricing-and-fees/fees
      stakingProtocol.fees = 25;
      break;
    case 'stakewise':
      stakingProtocol.id = StakingProtocol.Stakewise;
      stakingProtocol.name = 'StakeWise';
      stakingProtocol.logoUrl = 'https://icons.llama.fi/stakewise.png';

      // Source: https://docs.stakewise.io/faq#what-is-the-commission-for-staking-in-stakewise-pool
      stakingProtocol.fees = 10;
      break;
  }
  protocolMapBySlug.set(slug, stakingProtocol);
});

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

  response.data.forEach((protocol: any) => {
    if (protocol.chain === 'Ethereum' && protocolSlugs.includes(protocol.project)) {
      const stakingProtocol = protocolMapBySlug.get(protocol.project)!;
      stakingProtocol.tvl = protocol.tvlUsd;
      stakingProtocol.stakingApy = protocol.apyBase;
      stakingProtocol.netApy = protocol.apy;
      stakingProtocol.tokenRewardsApy = protocol.apyReward || 0;

      console.log(protocol.project + ": " + protocol.pool);
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