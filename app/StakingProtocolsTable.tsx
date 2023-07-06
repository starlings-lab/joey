import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import numeral from 'numeral';

import { StakingProtocol } from './types';


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
              <Text>{numeral(sp.tvl).format('($0.00a)')}</Text>
            </TableCell>
            <TableCell>
              <Text>{numeral(sp.netApy).format('0.0%')}</Text>
            </TableCell>
            <TableCell>
              <Text>{numeral(sp.stakingApy).format('0.0%')}</Text>
            </TableCell>
            <TableCell>
              <Text>{numeral(sp.tokenRewardsApy).format('0.0%')}</Text>
            </TableCell>
            <TableCell>
              <Text>{numeral(sp.fees).format('0.0%')}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
