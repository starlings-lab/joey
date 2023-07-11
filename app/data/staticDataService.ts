import { StakingProtocol, StakingProtocolDetails } from "../types";

export function getStakingProtocolDetails(protocolId: StakingProtocol): StakingProtocolDetails {
  return protocolDetailsMapById.get(protocolId)!;
}

// Static Data Reference: https://docs.google.com/spreadsheets/d/1SEXcufZL1-hskd3bkX8bZPCiuSHwoJe4o-I3xQFLBV8
const protocolDetailsMapById = new Map<StakingProtocol, StakingProtocolDetails>();
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
  websiteUrl: 'https://frax.finance/',
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

protocolDetailsMapById.set(StakingProtocol.Coinbase, {
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
    { name: 'Twitter', url: 'https://twitter.com/coinbase' },
    { name: 'Blog', url: 'https://www.coinbase.com/blog' },
    { name: 'Facebook', url: 'https://www.facebook.com/Coinbase' }
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