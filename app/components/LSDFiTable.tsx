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
  Text,
  Flex
} from '@tremor/react';
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";
import numeral from 'numeral';

import { LSDFiStrategySummary, SortOrder } from '../types';

const columns = [
  { label: 'Strategy', property: 'name' },
  { label: 'Features', property: 'features' },
  { label: 'TVL', property: 'tvl', format: '($0.00a)' },
  { label: 'Net APY', property: 'netApy', info: 'Staking APY + Token Rewards APY - Fees', format: '0.00', percent: true },
  { label: 'Base APY', property: 'stakingApy', format: '0.00', percent: true },
  { label: 'Token Rewards', property: 'tokenRewardsApy', format: '0.00', percent: true },
]

const sortData = (data: LSDFiStrategySummary[], sortField: string, sortOrder: SortOrder): LSDFiStrategySummary[] => {
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

export default function LSDFiTable({ lsdFiStrategies }: { lsdFiStrategies: LSDFiStrategySummary[] }) {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(SortOrder.None);
  const [lsdFiSorted, setLSDFiSorted] = useState(sortData(lsdFiStrategies, sortField, sortOrder));

  const handleSortingChange = (field: string) => {
    // If the field is the same, toggle the sort order, Otherwise, set the default sort order
    const newSortOrder =
      field === sortField && sortOrder === SortOrder.Ascending ? SortOrder.Descending : DEFAULT_SORT_ORDER;
    setSortField(field);
    setSortOrder(newSortOrder);
    setLSDFiSorted(sortData(lsdFiStrategies, field, newSortOrder));
  };

  const hasTokenRewardsApy = lsdFiStrategies.some((sp) => sp.tokenRewardsApy > 0);
  const columnsToUse = columns.filter((column) => (column.property !== 'tokenRewardsApy' || hasTokenRewardsApy));

  return (
    <Table className="protocol-table">
      <TableHead>
        <TableRow>
          {
            columnsToUse.map((column) => {
              // Set the image name for the sort icon
              // Only single column sorting is supported
              let imageName = 'default';
              if (column.property === sortField) {
                sortOrder === SortOrder.Ascending ? imageName = 'up_arrow' : imageName = 'down_arrow';
              }

              return (
                <TableHeaderCell key={column.property} onClick={() => handleSortingChange(column.property)}>
                  <Flex className='justify-start cursor-pointer'>
                    <Text>{column.label}</Text>
                    <Image className="ml-1" alt="" width="16" height="16" src={`/${imageName}.png`} />
                    {column.info && <Icon icon={InformationCircleIcon} tooltip={column.info} size="sm" color="neutral" />}
                  </Flex>

                </TableHeaderCell>
              )
            })
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {lsdFiSorted.map((sp) => (
          <TableRow key={sp.name}>
            {
              columnsToUse.map((column, index) => {
                const fieldValue = column.format
                  ? numeral(sp[column.property]).format(column.format)
                  : sp[column.property];

                return (
                  <TableCell key={column.property}>
                    <Link className="w-full" href={`/lsdfi/${sp.name}`}>
                      {index === 0 && <Image width="32" height="32" alt="" src={`/${sp.name}.svg`} className="logo" />}
                      {index === 1 && sp.features.map((feature) => <span key={feature} className="w-1/4 border border-2 py-1 px-2 m-1 rounded-md">{feature}</span>)}
                      {index != 1 ? <Text className={`${column.property} w-full`}>{fieldValue}{column.percent ? '%' : ''}</Text> : null}
                    </Link>
                  </TableCell>
                )
              })
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}