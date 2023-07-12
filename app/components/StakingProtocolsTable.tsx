'use client';
import Link from 'next/link';
import { useState } from "react";
import Image from 'next/image';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";
import numeral from 'numeral';

import { StakingProtocolSummary, SortOrder } from '../types';

const columns = [
  { label: 'Staking Protocol', property: 'name' },
  { label: 'TVL($)', property: 'tvl' },
  { label: 'Net APY', property: 'netApy', info: 'Sum of staking & token rewards APY after fees' },
  { label: 'Staking APY', property: 'stakingApy' },
  { label: 'Token Rewards APY', property: 'tokenRewardsApy' },
  { label: 'Fees', property: 'fees', info: 'Fees are percentage of staking rewards taken by the protocol' }
]

const sortData = (data: StakingProtocolSummary[], sortField: string, sortOrder: SortOrder): StakingProtocolSummary[] => {
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

export default function StakingProtocolsTable({ stakingProtocols }: { stakingProtocols: StakingProtocolSummary[] }) {
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

  const hasTokenRewardsApy = stakingProtocols.some((sp) => sp.tokenRewardsApy > 0);
  const columnsToUse = columns.filter((column) => (column.property !== 'tokenRewardsApy' || hasTokenRewardsApy));

  return (
    <Table className="protocol-table">
      <TableHead>
        <TableRow>
          {
            columnsToUse.map((column) => {
              // Set the class name for the sort icon
              // Only single column sorting is supported
              let className = 'default';
              if (column.property === sortField) {
                sortOrder === SortOrder.Ascending ? className = 'up' : className = 'down';
              }

              return (
                <TableHeaderCell key={column.property} className={className} onClick={() => handleSortingChange(column.property)}>
                  {column.label}
                  {column.info && <Icon icon={InformationCircleIcon} tooltip={column.info} size="sm" color="neutral" />}
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
              <Image width="35" height="35" alt="" src={sp.logoUrl} className="logo" />
              <Link className="name" href={`/${sp.defiLlamaPoolId}`}>{sp.name}</Link>
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
            {hasTokenRewardsApy &&
              <TableCell>
                <Text>{numeral(sp.tokenRewardsApy).format('0.00')}%</Text>
              </TableCell>
            }
            <TableCell>
              <Text>{numeral(sp.fees).format('0')}%</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
