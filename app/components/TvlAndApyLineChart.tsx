'use client'

import { Card, Title, LineChart } from "@tremor/react";

import { TvlAndApyDataPoint } from "../types";
import numeral from "numeral";

const dataFormatter = (number: number) => `${numeral(number).format('($0.00a)')}`;

export default function TvlAndApyLineChart({ historyData }: { historyData: TvlAndApyDataPoint[] }) {
  const chartdata = historyData.map((dataPoint) => {
    return {
      timestamp: new Date(dataPoint.timestamp).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      TVL: dataPoint.tvlUsd,
      APY: dataPoint.apy
    };
  });

  return (
    <Card>
      <Title>TVL and APY</Title>
      <LineChart
        className="mt-6"
        data={chartdata}
        index="timestamp"
        categories={["TVL"]}
        colors={["emerald", "blue"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
}