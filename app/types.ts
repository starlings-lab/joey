export enum StakingProtocol {
  Lido,
  FraxEther,
  RocketPool,
  Coinbase,
  Stakewise
}
export enum LSDFiStrategy {
  OETH,
  UNSHETH,
  Lybra,
  SommelierRealYieldETH,
  AlchemixLidoETH
}

export interface ProtocolSummary {
  name: string;
  tvl: number;
  netApy: number;
  stakingApy: number;
  tokenRewardsApy: number;
  fees: number;
  [key: string]: string | number | undefined | string[];
}

export interface StakingProtocolSummary extends ProtocolSummary {
  id: StakingProtocol;
  logoUrl: string;
  defiLlamaPoolId?: string;
  depositFee?: number;
}

export interface LSDFiStrategySummary extends ProtocolSummary {
  id: LSDFiStrategy;
  categories: string[];
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