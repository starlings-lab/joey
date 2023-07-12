'use client';

import { Card, Flex, Metric, BadgeDelta, Text, DeltaType } from "@tremor/react";
import numeral from "numeral";

export default function ValueBadgeWithDelta({ label, formattedValue, monthlyPercentChange }:
  { label: string, formattedValue: string, monthlyPercentChange: number }) {
  let deltaType: DeltaType = 'unchanged';
  let sign = '';
  if (monthlyPercentChange > 0) {
    deltaType = 'moderateIncrease';
    sign = '+';
  }
  else if (monthlyPercentChange < 0) {
    deltaType = 'moderateDecrease';
    sign = '-';
  }

  return (
    <Card decoration="top" className="max-w-xs">
      <Flex>
        <div className="w-1/2 mr-6">
          <Text>{label}</Text>
          <Metric className="mt-2">{formattedValue}</Metric>
        </div>
        <div className="w-1/2">
          <Text>Monthly Change</Text>
          <BadgeDelta className="mt-2" deltaType={deltaType} size="xs">
            {sign}{numeral(Math.abs(monthlyPercentChange)).format('0.00')}%
          </BadgeDelta>
        </div>
      </Flex>
    </Card>
  );
}