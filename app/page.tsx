import { Card, Title, Text, Flex } from '@tremor/react';

import StakingProtocolsTable from './components/StakingProtocolsTable';
import { getStakingProtocols } from './data/dataService';

export default async function IndexPage() {
  const stakingProtocols = await getStakingProtocols();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-8xl">
      <Flex flexDirection='col' justifyContent="center" alignItems="center">
        <Title className='text-3xl justify-self-center'>Maximize your ETH</Title>
        <Text className='text-lg'>
          Discover optimal investment opportunities for your Ethereum with Joey.
        </Text>
        <Text className='text-lg'>
          We deliver concise comparisons across liquid staking and LSDFi protocols.
        </Text>
      </Flex>
      <Card className="mt-6">
        <StakingProtocolsTable stakingProtocols={stakingProtocols} />
      </Card>
    </main>
  );
}
