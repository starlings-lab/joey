import { StakingProtocol } from '../types';

const stakingProtocols: StakingProtocol[] = [
  {
    name: 'Lido',
    tvl: 12000000000, // 12 billion
    netApy: 0.045,
    stakingApy: 0.044,
    tokenRewardsApy: 0.0,
    fees: 0.01
  },
  {
    name: 'Frax ETH',
    tvl: 112000000, // 112 million
    netApy: 0.052,
    stakingApy: 0.051,
    tokenRewardsApy: 0.0,
    fees: 0.0012
  },
  {
    name: 'Rocket Pool',
    tvl: 9000000000, // 9 billion
    netApy: 0.038,
    stakingApy: 0.039,
    tokenRewardsApy: 0.0,
    fees: 0.0010
  },
  {
    name: 'Coinbase',
    tvl: 993000000, // 993 million
    netApy: 0.055,
    stakingApy: 0.046,
    tokenRewardsApy: 0.01,
    fees: 0.0025
  },
  {
    name: 'Stakewise',
    tvl: 251000000, // 251 million
    netApy: 0.057,
    stakingApy: 0.058,
    tokenRewardsApy: 0.01,
    fees: 0.002
  }
];

export default async function getStakingProtocols() {
  return stakingProtocols;
}