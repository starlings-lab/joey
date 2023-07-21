'use client'

import { Card, Title, LineChart } from "@tremor/react";

import { ApyDataPoint, TvlDataPoint } from "../types";
import numeral from "numeral";

const tvlFormatter = (number: number) => `${numeral(number).format('($0.00a)')}`;
const apyFormatter = (number: number) => `${numeral(number).format('0.00')}%`;
type DataByMonth = {
  [key: string]: any;
};

export default function TvlAndApyLineChart({ apyHistoryData, tvlHistoryData }: { apyHistoryData: ApyDataPoint[], tvlHistoryData: TvlDataPoint[] }) {


  const apyDataByMonth = apyHistoryData.reduce((acc: DataByMonth, dataPoint) => {
    const key = new Date(dataPoint.timestamp).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

    if (!acc[key]) {
      acc[key] = {
        monthYear: key,
        apySum: 0,
        apyCount: 0
      };
    }

    acc[key].apySum += dataPoint.apy;
    acc[key].apyCount++;
    return acc;
  }, {});

  const tvlDataByMonth = tvlHistoryData.reduce((acc: DataByMonth, dataPoint) => {
    const key = new Date(dataPoint.timestamp).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

    if (!acc[key]) {
      acc[key] = {
        monthYear: key,
        tvlSum: 0,
        tvlCount: 0
      };
    }
    acc[key].tvlSum += dataPoint.tvlUsd;
    acc[key].tvlCount++;
    return acc;
  }, {});

  // array of objects with monthYear & APY
  const apyChartdata = Object.values(apyDataByMonth).map((dataPoint: any) => {
    return {
      monthYear: dataPoint.monthYear,
      APY: dataPoint.apySum / dataPoint.apyCount
    }
  });

  // array of objects with monthYear & TVL
  const tvlChartdata = Object.values(tvlDataByMonth).map((dataPoint: any) => {
    return {
      monthYear: dataPoint.monthYear,
      TVL: dataPoint.tvlSum / dataPoint.tvlCount
    }
  });

  return (
    <div className="md:flex">
      <Card className="mt-4 md:w-1/2 md:mr-5">
        <Title>TVL - Monthly Average</Title>
        <LineChart
          className="md:mt-4"
          data={tvlChartdata}
          index="monthYear"
          categories={["TVL"]}
          colors={["emerald"]}
          valueFormatter={tvlFormatter}
          showLegend={false}
        />
      </Card>
      <Card className="mt-4 md:w-1/2">
        <Title>Net APY - Monthly Average</Title>
        <LineChart
          className="md:mt-6"
          data={apyChartdata}
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