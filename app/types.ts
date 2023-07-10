export enum StakingProtocol {
  Lido,
  FraxEther,
  RocketPool,
  Coinbase,
  Stakewise
}

export interface StakingProtocolSummary {
  id: StakingProtocol;
  name: string;
  tvl: number;
  netApy: number;
  stakingApy: number;
  tokenRewardsApy: number;
  fees: number;
  logoUrl: string;
  defiLlamaPoolId?: string;
}

export enum SortOrder {
  None,
  Ascending,
  Descending
}

export interface TvlAndApyDataPoint {
  timestamp: Date;
  tvlUsd: number;
  apy: number;
}
