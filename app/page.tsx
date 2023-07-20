import { Card, Text, Flex } from '@tremor/react';

import LSDFiTable from './components/LSDFiTable';
import StakingProtocolsTable from './components/StakingProtocolsTable';
import { getLSDFiStrategies, getStakingProtocols } from './data/dataService';

export default async function IndexPage() {
  const [stakingProtocols, lsdFiStrategies] = await Promise.all([
    getStakingProtocols(),
    getLSDFiStrategies(),
  ]);

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
