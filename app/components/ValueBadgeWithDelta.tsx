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
    <Card className="max-w-xs">
      <Flex justifyContent="between" alignItems="center">
        <Text>{label}</Text>
        <BadgeDelta deltaType={deltaType} size="xs">
          {sign}{numeral(Math.abs(monthlyPercentChange)).format('0.00')}%
        </BadgeDelta>
      </Flex>
      <Metric>{formattedValue}</Metric>
    </Card>
  );
}