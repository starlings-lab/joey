import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

export interface StakingProtocol {
  name: string;
  tvl: number;
  netApy: number;
  stakingApy: number;
  tokenRewardsApy: number;
  fees: number;
}

export default async function StakingProtocolsTable({ stakingProtocols }: { stakingProtocols: StakingProtocol[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Staking Protocol</TableHeaderCell>
          <TableHeaderCell>TVL</TableHeaderCell>
          <TableHeaderCell>Net APY</TableHeaderCell>
          <TableHeaderCell>Staking APY</TableHeaderCell>
          <TableHeaderCell>Token Rewards APY</TableHeaderCell>
          <TableHeaderCell>Fees</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stakingProtocols.map((sp) => (
          <TableRow key={sp.name}>
            <TableCell>
              <Text>{sp.name}</Text>
            </TableCell>
            <TableCell>
              <Text>{sp.tvl}</Text>
            </TableCell>
            <TableCell>
              <Text>{sp.netApy}</Text>
            </TableCell>
            <TableCell>
              <Text>{sp.stakingApy}</Text>
            </TableCell>
            <TableCell>
              <Text>{sp.tokenRewardsApy}</Text>
            </TableCell>
            <TableCell>
              <Text>{sp.fees}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
