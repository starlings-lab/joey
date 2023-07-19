import { Card, Title, Text, Flex } from '@tremor/react';

import StakingProtocolsTable from './components/StakingProtocolsTable';
import { getStakingProtocols } from './data/dataService';
import { headers } from "next/headers";

export default async function IndexPage() {
  const stakingProtocols = await getStakingProtocols();

  // fetch LSDFi strategies
  const host = headers().get("host");
  const endpoint = `http://${host}/api/lsdfi`;
  console.log("Fetching LSDFi strategies from: " + endpoint);
  const lsdfiStrategies = await fetch(endpoint);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-8xl">
      <Flex flexDirection='col' justifyContent="center" alignItems="center">
        <div className='text-3xl justify-self-center mb-4'>Put your ETH to work</div>
        <Text className='text-lg text-center'>
          Discover optimal investment opportunities for your ETH with Joey.
          We deliver concise comparisons across liquid staking and LSDFi protocols.
        </Text>
      </Flex>
      <Card className="mt-6">
        <StakingProtocolsTable stakingProtocols={stakingProtocols} />
      </Card>
    </main>
  );
}
