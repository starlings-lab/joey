import { Card, Flex, Title } from "@tremor/react";
import numeral from "numeral";

import TvlAndApyLineChart from "../components/TvlAndApyLineChart";
import ValueBadgeWithDelta from "../components/ValueBadgeWithDelta";
import { getStakingProtocolSummary, getTvlAndApyHistory } from "../data/dataService";
import ProtocolDetailSection from "../components/ProtocolDetailSection";
import ApySourcesCard from "../components/ApySourcesCard";
import RisksCard from "../components/RisksCard";
import { getStakingProtocolRiskDetails } from "../data/staticDataService";
import Link from "next/link";

interface PageProps {
  params: {
    protocol: string;
  };
}

export default async function StakingProtocolDetails({ params }: PageProps) {
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
      <Title className="text-lg font-bold mb-2">{summary?.name}</Title>
      <div className="mr-2 mb-2 mt-2">
        <Link href="/">Home</Link><span>{' > '}</span><Link href="">{summary?.name}</Link>
      </div>
      <div className="md:flex">
        <div className="md:w-1/5 md:mr-5">
          <Card decoration="top">
            <ProtocolDetailSection summary={summary!} />
          </Card>
        </div>
        <div className="md:w-4/5">
          <div className="md:flex md:mb-5">
            <div className="md:w-1/2 md:mr-5">
              <ValueBadgeWithDelta label="TVL - Current" formattedValue={numeral(summary?.tvl || 0).format('($0.00a)')} monthlyPercentChange={tvlMonthlyPercentChange} />
            </div>
            <div className="md:w-1/2">
              <ValueBadgeWithDelta label="Net APY - Current" formattedValue={`${numeral(summary?.netApy || 0).format('0.00')}%`} monthlyPercentChange={apyMonthlyPercentChange} />
            </div>
          </div>
          <TvlAndApyLineChart historyData={history} />
          <div className="md:flex">
            <ApySourcesCard className="md:w-1/2 mt-4 mr-4" summary={summary!} />
            <RisksCard className="md:w-1/2 mt-4" riskDetails={getStakingProtocolRiskDetails(summary!.id)} />
          </div>
        </div>
      </div>
    </main>
  );
};