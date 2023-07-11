import { Card, Title } from "@tremor/react";
import TvlAndApyLineChart from "../components/TvlAndApyLineChart";
import ValueBadgeWithDelta from "../components/ValueBadgeWithDelta";
import { getStakingProtocolSummary, getTvlAndApyHistory } from "../data/dataService";
import numeral from "numeral";

interface PageProps {
  params: {
    protocol: string;
  };
}

export default async ({ params }: PageProps) => {
  const summary = await getStakingProtocolSummary(params.protocol)!;
  const data = await getTvlAndApyHistory(params.protocol);

  // calculate monthly delta
  const currentDataPoint = data[data.length - 1];
  const prevDataPoint = data[data.length - 31];
  const tvlMonthlyPercentChange = ((currentDataPoint.tvlUsd - prevDataPoint.tvlUsd) * 100) / prevDataPoint.tvlUsd;
  const apyMonthlyPercentChange = ((currentDataPoint.apy - prevDataPoint.apy) * 100) / prevDataPoint.apy;

  return (
    <div>
      <Title className="text-xlg">{summary?.name}</Title>
      <div className="flex flex-row">
        <div className="w-1/2">
          <ValueBadgeWithDelta label="TVL" formattedValue={numeral(summary?.tvl || 0).format('($0.00a)')} monthlyPercentChange={tvlMonthlyPercentChange} />
        </div>
        <div className="w-1/2">
          <ValueBadgeWithDelta label="APY" formattedValue={`${numeral(summary?.netApy || 0).format('0.00')}%`} monthlyPercentChange={apyMonthlyPercentChange} />
        </div>
      </div>

      <TvlAndApyLineChart historyData={data} />
    </div>
  );
};
