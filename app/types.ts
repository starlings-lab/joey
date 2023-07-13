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
  [key: string]: string | number | undefined;
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
  multipleAudits: boolean;
  protocolDependencies: string[];
  hasSlashingInsurance: boolean;
  slashingInsuranceNote?: string;
  liquidity: Level;
}