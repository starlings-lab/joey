'use client';
import { useState } from "react";

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

import { StakingProtocol, SortOrder } from './types';

const columns = [
  { label: 'Staking Protocol', property: 'name' },
  { label: 'TVL($)', property: 'tvl' },
  { label: 'Net APY', property: 'netApy' },
  { label: 'Staking APY', property: 'stakingApy' },
  { label: 'Token Rewards APY', property: 'tokenRewardsApy' },
  { label: 'Fees', property: 'fees' }
]

const sortData = (data: StakingProtocol[], sortField: string, sortOrder: SortOrder): StakingProtocol[] => {
  if (!sortField || sortOrder === SortOrder.None) {
    return data;
  }

  const sorted = [...data].sort((a: any, b: any) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue === null) return 1;
    if (bValue === null) return -1;
    if (aValue === null && bValue === null) return 0;

    let compare;
    if (typeof aValue === 'number') {
      compare = aValue - bValue;
    }
    else {
      compare = aValue.toString().localeCompare(bValue.toString(), "en");
    }

    return (compare * (sortOrder === SortOrder.Ascending ? 1 : -1));
  });

  return sorted;
};

const DEFAULT_SORT_ORDER = SortOrder.Ascending;

export default function StakingProtocolsTable({ stakingProtocols }: { stakingProtocols: StakingProtocol[] }) {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(SortOrder.None);
  const [stakingProtocolsSorted, setStakingProtocolsSorted] = useState(sortData(stakingProtocols, sortField, sortOrder));

  const handleSortingChange = (field: string) => {
    // If the field is the same, toggle the sort order, Otherwise, set the default sort order
    const newSortOrder =
      field === sortField && sortOrder === SortOrder.Ascending ? SortOrder.Descending : DEFAULT_SORT_ORDER;
    setSortField(field);
    setSortOrder(newSortOrder);
    setStakingProtocolsSorted(sortData(stakingProtocols, field, newSortOrder));
  };

  return (
    <Table className="protocol-table">
      <TableHead>
        <TableRow>
          {
            columns.map((column) => {
              // Set the class name for the sort icon
              // Only single column sorting is supported
              let className = 'default';
              if (column.property === sortField) {
                sortOrder === SortOrder.Ascending ? className = 'up' : className = 'down';
              }

              return (
                <TableHeaderCell key={column.property} className={className} onClick={() => handleSortingChange(column.property)}>
                  {column.label}
                </TableHeaderCell>
              )
            })
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {stakingProtocolsSorted.map((sp) => (
          <TableRow key={sp.name}>
            <TableCell>
              <img src={sp.logoUrl} className="logo" />
              <Text className="name" >{sp.name}</Text>
            </TableCell>
            <TableCell>
              <Text>{numeral(sp.tvl).format('($0.00a)')}</Text>
            </TableCell>
            <TableCell>
              <Text>{numeral(sp.netApy).format('0.00')}%</Text>
            </TableCell>
            <TableCell>
              <Text>{numeral(sp.stakingApy).format('0.00')}%</Text>
            </TableCell>
            <TableCell>
              <Text>{numeral(sp.tokenRewardsApy).format('0.00')}%</Text>
            </TableCell>
            <TableCell>
              <Text>{numeral(sp.fees).format('0')}%</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
