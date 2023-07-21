import { LSDFiStrategy, Level, StakingProtocol, StakingProtocolDetails, RiskDetails, StakingProtocolSummary, LSDFiStrategySummary, Fee } from "../types";

export function getStakingProtocolDetails(protocolId: StakingProtocol | LSDFiStrategy): StakingProtocolDetails {
  return protocolDetailsMapById.get(protocolId)!;
}

export function getStakingProtocolMapBySlug(): ReadonlyMap<string, StakingProtocolSummary> {
  return protocolMapBySlug;
}

export function getRiskDetails(id: StakingProtocol | LSDFiStrategy): RiskDetails {
  return protocolRiskDetailsMapById.get(id)!;
}

export function getLsdFiStrategyIdByName(name: string): LSDFiStrategy | undefined {
  return LSDFiStrategyIdByNameMap.get(name.toLowerCase());
}

export function getLSDFiStrategyDisplayNameById(id: LSDFiStrategy): string {
  switch (id) {
    case LSDFiStrategy.OETH:
      return 'OETH';
    case LSDFiStrategy.Lybra:
      return 'Lybra';
    case LSDFiStrategy.UNSHETH:
      return 'unshETH';
    case LSDFiStrategy.SommelierRealYieldETH:
      return 'Sommelier Real Yield ETH';
    case LSDFiStrategy.AlchemixLidoETH:
      return 'AlchemixLidoWstETH';
  }
}

export function getLSDFiFeeById(id: LSDFiStrategy): Fee[] {
  switch (id) {
    case LSDFiStrategy.OETH:
      return [{name: "Exit Fee", description: "charged for your OETH amount when you exit", value: 0.5}, {name: "Performance Fee", description: "charged on your yields", value: 20}];
    case LSDFiStrategy.Lybra:
      return [{name: "Service Fee", description: "", value: 1.5}];
    case LSDFiStrategy.UNSHETH:
      return [{name: "Protocol Fee", description: "", value: 0}];
    case LSDFiStrategy.SommelierRealYieldETH:
      return [{name: "Platform Fee", description: "", value: 2}, {name: "Performance Fee", description: "", value: 20}];
    case LSDFiStrategy.AlchemixLidoETH:
      return [{name: "Protocol Fee", description: "charged on your yields", value: 10}];
  }
}

export function getLSDFiStrategyFeaturesById(id: LSDFiStrategy): string[] {
  switch (id) {
    case LSDFiStrategy.OETH:
      // Source: https://docs.oeth.com/core-concepts/yield-generation
      return ["Index", "Lending", "LP"];
    case LSDFiStrategy.Lybra:
      return ["Index", "Fees"];
    case LSDFiStrategy.UNSHETH:
      // Source: https://docs.unsheth.xyz/en/unshETH
      // unshETH Real Yield APR = ETH Staking APR + Swap Fee APR (swapping between LSDs) + Mint/Redeem Fee APR
      return ["Index", "LP"];
    case LSDFiStrategy.SommelierRealYieldETH:
      return ["Leverage", "Lending", "LP"];
    case LSDFiStrategy.AlchemixLidoETH:
      return ["Self-Repaying Loan"];
  }
}

export function getLSDFiStrategyHowItWorks(id: LSDFiStrategy): string {
  switch (id) {
    case LSDFiStrategy.OETH:
      return `Index of liquid staking protocols: OETH earns staking rewards from various liquid staking protocols. 
      
      Liquidity Provision with boost: Your deposit will be converted to OETH token and the protocols provide liquidity to OETH-ETH pair in Curve. Then the protocol uses Convex to boost token rewards in Curve and Convex.`;
    case LSDFiStrategy.Lybra:
      return `Lybra Finance has launched two native tokens - eUSD, an interest-bearing stablecoin, and LBR, a utility token. Users can deposit ETH/stETH, mint eUSD, and earn interest or use it in other DeFi protocols. The platform generates interest from stETH and liquidity staking derivatives, while the eUSD maintains a $1 peg through user-regulated supply and demand. Users can earn yield via holding eUSD, leverage their long position on ETH and profit from LBR tokens. `;
    case LSDFiStrategy.UNSHETH:
      return `unshETH Ether is a diversified liquid staked ETH index that earns staking ETH yield and swap fees, all wrapped in a single omnichain ERC-20 token available on ETH, BNB Chain, and Arbitrum.`;
    case LSDFiStrategy.SommelierRealYieldETH:
      return `"Leveraged staking: Sommelier borrows ETH against LSD tokens, stake the borrowed ETH to get LSD tokens, and borrows ETH against the LSD tokens again. They repeat this cycle to maximize yields. 
      
      Liquidity Provisioning: Sommelier provides liquidity to ETH/ LSD trading pairs on Uniswap V3. They earn fees from traders who swap between the two tokens."`;
    case LSDFiStrategy.AlchemixLidoETH:
      return `Alchemix allows participants to secure their loans with collateral. The unique aspect of Alchemix is its ability to convert that collateral into a tokenized asset, which can be employed elsewhere in the DeFi marketplace. This synthetic collateral is subsequently lent out, which allows for the autonomous repayment of the initial loan, while avoiding the risk of forced liquidation.`;
  }
}

export function getLSDFiStrategyProtocols(id: LSDFiStrategy): string[] {
  switch (id) {
    case LSDFiStrategy.OETH:
      return ["Convex",
        "RocketPool",
        "FraxEther",
        "Lido",
        "Morpho"];
    case LSDFiStrategy.Lybra:
      return ["Lido"];
    case LSDFiStrategy.UNSHETH:
      return ["FraxEther",
        "RocketPool",
        "Lido",
        "CoinbaseETH",
        "Ankr",
        "Swell"];
    case LSDFiStrategy.SommelierRealYieldETH:
      return ["Morpho",
        "Compound",
        "Aave",
        "UniswapV3"];
    case LSDFiStrategy.AlchemixLidoETH:
      return ["Lido"];
  }
}

export function getLSDFiStrategyMapBySlug(): ReadonlyMap<string, LSDFiStrategySummary> {
  return lsdfiStrategyMapBySlug;
}

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
    fees: [],
    logoUrl: ''
  };

  switch (slug) {
    case 'lido':
      stakingProtocol.id = StakingProtocol.Lido;
      stakingProtocol.name = 'Lido';
      stakingProtocol.logoUrl = 'Lido';

      // Lido takes 10% fee on users staking rewards
      // Source: https://docs.lido.fi/#protocol-fee
      stakingProtocol.fees = [{name: "Protocol Fee", description: "", value: 10}];
      break;
    case 'frax-ether':
      stakingProtocol.id = StakingProtocol.FraxEther;
      stakingProtocol.name = 'FraxEther';
      stakingProtocol.logoUrl = 'FraxEther';

      // Source: https://exponential.fi/assets/b8956e66-fe6c-4a88-8e96-530e2e7dea4c
      stakingProtocol.fees = [{name: "Protocol Fee", description: "", value: 10}];
      break;
    case 'rocket-pool':
      stakingProtocol.id = StakingProtocol.RocketPool;
      stakingProtocol.name = 'RocketPool';
      stakingProtocol.logoUrl = 'RocketPool';

      // TODO: how do we display 0.05% of deposit fee when ETH is depsoited through protocol?
      // Source: https://twitter.com/Rocket_Pool/status/1506519957986758659
      stakingProtocol.fees = [{name: "Protocol Fee", description: "", value: 15}];
      stakingProtocol.depositFee = 0.0005;
      break;
    case 'coinbase-wrapped-staked-eth':
      stakingProtocol.id = StakingProtocol.CoinbaseETH;
      stakingProtocol.name = 'CoinbaseEth';
      stakingProtocol.logoUrl = 'CoinbaseETH';

      // Source: https://help.coinbase.com/en/coinbase/trading-and-funding/pricing-and-fees/fees
      stakingProtocol.fees = [{name: "Protocol Fee", description: "", value: 25}];
      break;
    case 'stakewise':
      stakingProtocol.id = StakingProtocol.Stakewise;
      stakingProtocol.name = 'Stakewise';
      stakingProtocol.logoUrl = 'Stakewise';

      // Source: https://docs.stakewise.io/faq#what-is-the-commission-for-staking-in-stakewise-pool
      stakingProtocol.fees = [{name: "Protocol Fee", description: "", value: 10}];
      break;
  }
  protocolMapBySlug.set(slug, stakingProtocol);
});

// Static Data Reference: https://docs.google.com/spreadsheets/d/1SEXcufZL1-hskd3bkX8bZPCiuSHwoJe4o-I3xQFLBV8
const protocolDetailsMapById = new Map<StakingProtocol | LSDFiStrategy, StakingProtocolDetails>();
protocolDetailsMapById.set(StakingProtocol.Lido, {
  launchDate: 'June 2021',
  auditors: [
    { name: 'Statemind', url: 'https://github.com/lidofinance/audits' },
    { name: 'Sigma Prime', url: 'https://github.com/lidofinance/audits' },
    { name: 'Certora', url: 'https://github.com/lidofinance/audits' }
  ],
  investors: [
    { name: 'Paradigm', url: 'https://www.paradigm.xyz/' },
    { name: 'a16z', url: 'https://a16z.com/' },
    { name: 'Dragonfly', url: 'https://www.dragonfly.xyz/' }
  ],
  websiteUrl: 'https://lido.fi/',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/lidofinance' },
    { name: 'Discord', url: 'https://discord.com/invite/lido' },
    { name: 'Telegram', url: 'https://t.me/lidofinance' }
  ]
});

protocolDetailsMapById.set(StakingProtocol.FraxEther, {
  launchDate: 'October 2022',
  auditors: [
    { name: 'Trail of Bits', url: 'https://github.com/trailofbits/publications/blob/master/reviews/2022-10-fraxfinance-fraxlend-fraxferry-securityreview.pdf' },
    { name: 'Code4rena', url: 'https://code4rena.com/reports/2022-09-frax' }
  ],
  investors: [
    { name: 'Robot Ventures', url: 'https://robvc.com/' },
    { name: 'Electric Capital', url: 'https://www.electriccapital.com/' },
    { name: 'Dragonfly', url: 'https://www.dragonfly.xyz/' }
  ],
  websiteUrl: 'https://app.frax.finance/frxeth/stake',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/fraxfinance' },
    { name: 'Discord', url: 'https://discord.gg/UJVtDTFRaA' },
    { name: 'Telegram', url: 'https://t.me/fraxfinance' }
  ]
});

protocolDetailsMapById.set(StakingProtocol.RocketPool, {
  launchDate: 'November 2021',
  auditors: [
    { name: 'Consensys', url: 'https://consensys.net/diligence/audits/2021/04/rocketpool/' },
    { name: 'Sigma Prime', url: 'https://rocketpool.net/files/sigma-prime-atlas-v1.2.pdf' },
    { name: 'Trail of Bits', url: 'https://github.com/trailofbits/publications/blob/master/reviews/RocketPool.pdf' }
  ],
  investors: [
    { name: 'Consensys Mesh', url: 'https://www.mesh.xyz/' },
    { name: 'Coinbase Venture', url: 'https://www.coinbase.com/ventures' },
    { name: '1kx', url: 'https://1kx.network/' }
  ],
  websiteUrl: 'https://rocketpool.net/',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/Rocket_Pool' },
    { name: 'Discord', url: 'https://discord.gg/rocketpool' },
    { name: 'Reddit', url: 'https://www.reddit.com/r/rocketpool/' }
  ]
});

protocolDetailsMapById.set(StakingProtocol.CoinbaseETH, {
  launchDate: 'March 2023',
  auditors: [
    { name: 'OpenZeppelin', url: 'https://blog.openzeppelin.com/coinbase-liquid-staking-token-audit' }
  ],
  investors: [
    { name: 'a16z', url: 'https://a16z.com/' },
    { name: 'Union Square Ventures', url: 'https://www.usv.com/' },
    { name: 'Ribbit Capital', url: 'https://ribbitcap.com/' }
  ],
  websiteUrl: 'https://www.coinbase.com/earn/staking/ethereum',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/coinbase' }
  ]
});

protocolDetailsMapById.set(StakingProtocol.Stakewise, {
  launchDate: 'March 2021',
  auditors: [
    { name: 'Pessimistic', url: 'https://github.com/stakewise/contracts/blob/master/audits/2022-09-16-Pessimistic.pdf' },
    { name: 'Quantstamp', url: 'https://github.com/stakewise/contracts/blob/master/audits/2022-05-06-Quantstamp.pdf' },
    { name: 'Omniscia', url: 'https://github.com/stakewise/contracts/blob/master/audits/2021-11-25-Omniscia.pdf' }
  ],
  investors: [
    { name: 'Blockdaemon', url: 'https://www.blockdaemon.com/' },
    { name: 'Boldstart Ventures', url: 'https://boldstart.vc/' },
    { name: 'GBV Capital', url: 'https://www.gbv.capital/' }
  ],
  websiteUrl: 'https://stakewise.io/',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/stakewise_io' },
    { name: 'Discord', url: 'https://discord.gg/8Zf7tKyXeZ' },
    { name: 'Telegram', url: 'https://t.me/stakewise_io' }
  ]
});

protocolDetailsMapById.set(LSDFiStrategy.OETH, {
  launchDate: 'May 2023',
  auditors: [
    { name: 'Narya', url: 'https://github.com/OriginProtocol/security/blob/master/audits/Narya%20-%20Origin%20OETH%20Report%20-%20May%202023%20-%20Initial%20Report.pdf' },
    { name: 'Open Zeppelin +', url: 'https://docs.oeth.com/security-and-risks/audits' }
  ],
  investors: [
    { name: 'a16z', url: 'https://a16z.com/' },
    { name: 'Pantera Capital', url: 'https://panteracapital.com/' },
    { name: 'Coinbase Ventures', url: 'https://www.coinbase.com/ventures' }
  ],
  websiteUrl: 'https://www.oeth.com/',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/OriginProtocol' },
    { name: 'Discord', url: 'https://discord.com/invite/ogn' },
  ]
});

protocolDetailsMapById.set(LSDFiStrategy.Lybra, {
  launchDate: 'April 2023',
  auditors: [
    { name: 'Source Hat (formerly Solidity Finance)', url: 'https://solidity.finance/audits/Lybra/' },
  ],
  investors: [
  ],
  websiteUrl: 'https://lybrafinance.fi/',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/LybraFinanceLSD' },
    { name: 'Discord', url: 'https://discord.com/invite/mgyq3PhdJg' },
  ]
});

protocolDetailsMapById.set(LSDFiStrategy.UNSHETH, {
  launchDate: 'February 2023',
  auditors: [
    { name: 'Certik', url: 'https://unsheth.xyz/v2-audit.pdf' },
  ],
  investors: [
  ],
  websiteUrl: 'https://unsheth.xyz/',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/unsheth_xyz' },
    { name: 'Discord', url: 'https://discord.gg/5tZXASh5P3' },
  ]
});

protocolDetailsMapById.set(LSDFiStrategy.SommelierRealYieldETH, {
  launchDate: 'March 2023',
  auditors: [
    { name: '0xMacro', url: 'https://www.sommelier.finance/audits' },
  ],
  investors: [
    { name: 'Polychain Capital', url: 'https://polychain.capital/' },
    { name: 'Standard Crypto', url: 'https://www.standardcrypto.vc/' },
    { name: 'Multicoin Capital', url: 'https://multicoin.capital/' }
  ],
  websiteUrl: 'https://www.sommelier.finance/',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/sommfinance' },
    { name: 'Discord', url: 'https://discord.com/invite/ZcAYgSBxvY' },
    { name: 'Telegram', url: 'https://t.me/getsomm' },
  ]
});

protocolDetailsMapById.set(LSDFiStrategy.AlchemixLidoETH, {
  launchDate: 'February 2021',
  auditors: [
    { name: 'Runtime Verification', url: 'https://alchemix-finance.gitbook.io/user-docs/audits' },
  ],
  investors: [
    { name: 'Immutable Capital', url: 'https://immutable.capital/' },
    { name: 'Nascent', url: 'https://www.nascent.xyz/' },
    { name: 'e-girl capital', url: 'https://www.egirlcapital.com/' }
  ],
  websiteUrl: 'https://alchemix.fi/',
  communicationChannels: [
    { name: 'Twitter', url: 'https://twitter.com/AlchemixFi' },
    { name: 'Discord', url: 'https://discord.com/invite/alchemix' },
    { name: 'Medium', url: 'https://alchemixfi.medium.com/' },
  ]
});

// Staking protocol risk details map
const protocolRiskDetailsMapById = new Map<StakingProtocol | LSDFiStrategy, RiskDetails>();
protocolRiskDetailsMapById.set(StakingProtocol.Lido, {
  multipleAudits: true,
  protocolDependencies: [],
  hasSlashingInsurance: true,
  liquidity: Level.High
});

protocolRiskDetailsMapById.set(StakingProtocol.FraxEther, {
  multipleAudits: true,
  protocolDependencies: ['Curve', 'Convex'],
  hasSlashingInsurance: true,
  liquidity: Level.Medium
});

protocolRiskDetailsMapById.set(StakingProtocol.RocketPool, {
  multipleAudits: true,
  protocolDependencies: [],
  hasSlashingInsurance: true,
  liquidity: Level.Medium
});

protocolRiskDetailsMapById.set(StakingProtocol.CoinbaseETH, {
  multipleAudits: false,
  protocolDependencies: [],
  hasSlashingInsurance: false,
  slashingInsuranceNote: 'Slashing coverage is provided only for Coinbase Prime',
  liquidity: Level.Low
});

protocolRiskDetailsMapById.set(StakingProtocol.Stakewise, {
  multipleAudits: true,
  protocolDependencies: [],
  hasSlashingInsurance: true,
  liquidity: Level.Low
});

protocolRiskDetailsMapById.set(LSDFiStrategy.OETH, {
  multipleAudits: true,
  protocolDependencies: [],
  liquidity: Level.High
});

protocolRiskDetailsMapById.set(LSDFiStrategy.Lybra, {
  multipleAudits: false,
  protocolDependencies: [],
  liquidity: Level.Medium
});

protocolRiskDetailsMapById.set(LSDFiStrategy.UNSHETH, {
  multipleAudits: false,
  protocolDependencies: [],
  liquidity: Level.Low
});

protocolRiskDetailsMapById.set(LSDFiStrategy.SommelierRealYieldETH, {
  multipleAudits: true,
  protocolDependencies: [],
  liquidity: Level.Low
});

protocolRiskDetailsMapById.set(LSDFiStrategy.AlchemixLidoETH, {
  multipleAudits: true,
  protocolDependencies: [],
  liquidity: Level.High
});

// Name of LSDFi strategies used in dune query(id: 2750230) => LSDFiStrategy enum
const LSDFiStrategyIdByNameMap = new Map<string, LSDFiStrategy>([
  ["lybra", LSDFiStrategy.Lybra],
  ["unsheth", LSDFiStrategy.UNSHETH],
  ["oeth", LSDFiStrategy.OETH],
  ["alchemix", LSDFiStrategy.AlchemixLidoETH],
]);

// LSDFi strategies that we are interested in and its DefiLlama project name/slug
const lsdfiStrategySlugs = ['origin-ether', 'unsheth'];
const LSDFiStrategyIdByDLSlugMap = new Map<string, LSDFiStrategy>([
  ["unsheth", LSDFiStrategy.UNSHETH],
  ["origin-ether", LSDFiStrategy.OETH],
]);
const lsdfiStrategyMapBySlug = new Map<string, LSDFiStrategySummary>();

// Populate map with LSDFi strategies
lsdfiStrategySlugs
  .forEach((slug: string) => {
    const id = LSDFiStrategyIdByDLSlugMap.get(slug)!;
    lsdfiStrategyMapBySlug.set(slug, {
      id: id,
      name: getLSDFiStrategyDisplayNameById(id),
      tvl: 0,
      netApy: 0,
      stakingApy: 0,
      tokenRewardsApy: 0,
      fees: getLSDFiFeeById(id),
      features: getLSDFiStrategyFeaturesById(id)
    });
  });