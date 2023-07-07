export interface StakingProtocol {
  name: string;
  tvl: number;
  netApy: number;
  stakingApy: number;
  tokenRewardsApy: number;
  fees: number;
  logoUrl: string;
}

export enum SortOrder {
  None,
  Ascending,
  Descending
}