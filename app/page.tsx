import { Card, Text, Flex } from '@tremor/react';

import LSDFiTable from './components/LSDFiTable';
import StakingProtocolsTable from './components/StakingProtocolsTable';
import { getStakingProtocols } from './data/dataService';
import { LSDFiStrategy } from './types';
import { headers } from "next/headers";

export default async function IndexPage() {
  const stakingProtocols = await getStakingProtocols();

  // fetch LSDFi strategies
  const host = headers().get("host");
  const endpoint = `http://${host}/api/lsdfi`;
  console.log("Fetching LSDFi strategies from: " + endpoint);
  const lsdfiStrategies = await fetch(endpoint);
  const lsdFiStrategies = 
  [
    {
      id: LSDFiStrategy.OETH,
      name: "OETH",
      tvl: 12,
      netApy: 6,
      stakingApy: 0,
      tokenRewardsApy: 0,
      fees: 10,
      features: ["LPing", "Index"]
    },
    {
      id: LSDFiStrategy.AlchemixLidoETH,
      name: "Alchemix Lido wstETH",
      tvl: 42,
      netApy: 5,
      stakingApy: 0,
      tokenRewardsApy: 0,
      fees: 8,
      features: ["Self-Repaying Loan"]
    },
    {
      id: LSDFiStrategy.SommelierRealYieldETH,
      name: "Sommelier Real Yield ETH",
      tvl: 55,
      netApy: 6,
      stakingApy: 0,
      tokenRewardsApy: 0,
      fees: 5,
      features: ["Leverage", "LPing"]
    },
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-8xl">
      <Flex flexDirection='col' justifyContent="center" alignItems="center">
        <div className='text-3xl justify-self-center mb-4'>Put your ETH to work</div>
        <Text className='text-lg text-center'>
          Discover optimal investment opportunities for your ETH with Joey.
          We deliver concise comparisons across liquid staking and LSDFi protocols.
        </Text>
      </Flex>
      <div className='text-xl text-left mt-8 mb-4'>Liquid Staking Protocols</div>
      <Card className="mt-6">
        <StakingProtocolsTable stakingProtocols={stakingProtocols} />
      </Card>
      <div className='text-xl text-left mt-8 mb-4'>LSDFi</div>
      <Card className="mt-6">
        <LSDFiTable lsdFiStrategies={lsdFiStrategies} />
      </Card>
    </main>
  );
}
