import { Card, Title, Text } from '@tremor/react';
import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const users = [];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Put your ETH to work</Title>
      <Text>
        Joey is one-stop platform to analyze and find what to do with your ETH.
      </Text>
      <Text>We compare various metrics in liquid staking and LSDFi protocols.</Text>
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
