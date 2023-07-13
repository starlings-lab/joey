'use client'

import { Card, Title, LineChart } from "@tremor/react";

import { TvlAndApyDataPoint } from "../types";
import ValueBadgeWithDelta from "../components/ValueBadgeWithDelta";
import numeral from "numeral";

const tvlFormatter = (number: number) => `${numeral(number).format('($0.00a)')}`;
const apyFormatter = (number: number) => `${numeral(number).format('0.00')}%`;
type DataByMonth = {
  [key: string]: any;
};

export default function TvlAndApyLineChart({ historyData }: { historyData: TvlAndApyDataPoint[] }) {


  const dataByMonth = historyData.reduce((acc: DataByMonth, dataPoint) => {
    const key = new Date(dataPoint.timestamp).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

    if (!acc[key]) {
      acc[key] = {
        monthYear: key,
        tvlSum: 0,
        apySum: 0,
        tvlCount: 0,
        apyCount: 0
      };
    }
    acc[key].tvlSum += dataPoint.tvlUsd;
    acc[key].tvlCount++;
    acc[key].apySum += dataPoint.apy;
    acc[key].apyCount++;
    return acc;
  }, {});

  // array of objects with monthYear, TVL and APY
  const chartdata = Object.values(dataByMonth).map((dataPoint: any) => {
    return {
      monthYear: dataPoint.monthYear,
      TVL: dataPoint.tvlSum / dataPoint.tvlCount,
      APY: dataPoint.apySum / dataPoint.apyCount
    }
  });

  return (
    <div className="md:flex">
      <Card className="md:w-1/2 md:mr-5">
        <Title>TVL - Monthly Average</Title>
        <LineChart
          className="md:mt-4"
          data={chartdata}
          index="monthYear"
          categories={["TVL"]}
          colors={["emerald"]}
          valueFormatter={tvlFormatter}
          showLegend={false}
        />
      </Card>
      <Card className="md:w-1/2">
        <Title>Net APY - Monthly Average</Title>
        <LineChart
          className="md:mt-6"
          data={chartdata}
          index="monthYear"
          categories={["APY"]}
          colors={["blue"]}
          valueFormatter={apyFormatter}
          showLegend={false}
        />
      </Card>
    </div>
  );
}