export enum StakingProtocol {
  Lido,
  FraxEther,
  RocketPool,
  CoinbaseETH,
  Stakewise
}
export enum LSDFiStrategy {
  OETH,
  UNSHETH,
  Lybra,
  SommelierRealYieldETH,
  AlchemixLidoETH
}

export interface Fee {
  name: string;
  description: string;
  value: number;
}

export interface ProtocolSummary {
  name: string;
  tvl: number;
  netApy: number;
  stakingApy: number;
  tokenRewardsApy: number;
  fees: Fee[];
  defiLlamaPoolId?: string;
  [key: string]: string | number | undefined | string[] | Fee[];
}

export interface StakingProtocolSummary extends ProtocolSummary {
  id: StakingProtocol;
  logoUrl: string;
  depositFee?: number;
}

export interface LSDFiStrategySummary extends ProtocolSummary {
  id: LSDFiStrategy;
  features: string[];
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

export interface RiskDetails {
  multipleAudits: boolean;
  protocolDependencies: string[];
  hasSlashingInsurance?: boolean;
  slashingInsuranceNote?: string;
  liquidity: Level;
}

