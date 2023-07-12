import { Card, Flex, Title } from "@tremor/react";
import numeral from "numeral";

import TvlAndApyLineChart from "../components/TvlAndApyLineChart";
import ValueBadgeWithDelta from "../components/ValueBadgeWithDelta";
import { getStakingProtocolSummary, getTvlAndApyHistory } from "../data/dataService";
import ProtocolDetailSection from "../components/ProtocolDetailSection";
import ApySourcesCard from "../components/ApySourcesCard";
import RisksCard from "../components/RisksCard";
import { getStakingProtocolRiskDetails } from "../data/staticDataService";

interface PageProps {
  params: {
    protocol: string;
  };
}

export default async ({ params }: PageProps) => {
  // Wait for the promises to resolve
  const [summary, history] = await Promise.all([
    getStakingProtocolSummary(params.protocol),
    getTvlAndApyHistory(params.protocol)
  ]);

  // calculate monthly delta
  const currentDataPoint = history[history.length - 1];
  const prevDataPoint = history[history.length - 31];
  const tvlMonthlyPercentChange = ((currentDataPoint.tvlUsd - prevDataPoint.tvlUsd) * 100) / prevDataPoint.tvlUsd;
  const apyMonthlyPercentChange = ((currentDataPoint.apy - prevDataPoint.apy) * 100) / prevDataPoint.apy;

  return (
    <main className="p-4 md:p-10 mx-auto max-w-8xl">
      <Title className="text-2xl font-bold mb-2">{summary?.name}</Title>
      <div className="flex flex-row">
        <Card className="w-1/5 mr-2" decoration="top">
          <ProtocolDetailSection summary={summary!} />
        </Card>
        <div className="flex-1 flex-wrap">
          <div className="flex flex-row mb-2">
            <div className="w-1/2">
              <ValueBadgeWithDelta label="TVL - Current" formattedValue={numeral(summary?.tvl || 0).format('($0.00a)')} monthlyPercentChange={tvlMonthlyPercentChange} />
            </div>
            <div className="w-1/2">
              <ValueBadgeWithDelta label="Net APY - Current" formattedValue={`${numeral(summary?.netApy || 0).format('0.00')}%`} monthlyPercentChange={apyMonthlyPercentChange} />
            </div>
          </div>
          <TvlAndApyLineChart historyData={history} />
          <Flex justifyContent="start" alignItems="baseline">
            <ApySourcesCard className="mt-2" summary={summary!} />
            <RisksCard className="mt-2 ml-2" riskDetails={getStakingProtocolRiskDetails(summary!.id)} />
          </Flex>
        </div>
      </div>
    </main>
  );
};