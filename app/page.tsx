import { Card, Title, Text } from '@tremor/react';
import UsersTable from './StakingProtocolsTable';
import { StakingProtocol } from './StakingProtocolsTable';
export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const stakingProtocols: StakingProtocol[] = [
    {
      name: 'Lido',
      tvl: 1000000000,
      netApy: 4.5,
      stakingApy: 4.4,
      tokenRewardsApy: 0.0,
      fees: 0.1
    }
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Put your ETH to work</Title>
      <Text>
        Joey is one-stop platform to analyze and find what to do with your ETH.
      </Text>
      <Text>We compare various metrics in liquid staking and LSDFi protocols.</Text>
      <Card className="mt-6">
        <UsersTable stakingProtocols={stakingProtocols} />
      </Card>
    </main>
  );
}
