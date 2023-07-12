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
  depositFee?: number;
}

export interface NameAndUrl {
  name: string;
  url: string;
}

export interface StakingProtocolDetails {
  launchDate: string;
  auditors: NameAndUrl[];
  investors: NameAndUrl[];
  websiteUrl: string;
  communicationChannels: NameAndUrl[];
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

export enum Level {
  Low,
  Medium,
  High
}

export interface StakingProtocolRiskDetails {
  hackedTillDate: boolean;
  multipleAudits: boolean;
  protocolDependencies: string[];
  hasSlashingInsurance: boolean;
  slashingRate: Level;
  liquidity: Level;
}