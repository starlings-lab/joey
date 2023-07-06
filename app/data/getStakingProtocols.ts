import { StakingProtocol } from '../types';

const stakingProtocols: StakingProtocol[] = [
  {
    name: 'Lido',
    tvl: 12000000000, // 12 billion
    netApy: 0.045,
    stakingApy: 0.044,
    tokenRewardsApy: 0.0,
    fees: 0.1
  },
  {
    name: 'Frax ETH',
    tvl: 112000000, // 112 million
    netApy: 0.052,
    stakingApy: 0.051,
    tokenRewardsApy: 0.0,
    fees: 0.001
  },
  {
    name: 'Rocket Pool',
    tvl: 9000000000, // 9 billion
    netApy: 0.038,
    stakingApy: 0.039,
    tokenRewardsApy: 0.0,
    fees: 0.001
  },
  {
    name: 'Swell',
    tvl: 993000000, // 993 million
    netApy: 0.055,
    stakingApy: 0.046,
    tokenRewardsApy: 0.01,
    fees: 0.001
  }
];

export default async function getStakingProtocols() {
  return stakingProtocols;
}