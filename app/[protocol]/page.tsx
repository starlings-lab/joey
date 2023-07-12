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
      <Title className="text-lg mb-4">
        <Link href="/" className="text-[#5C59E8] hover:text-blue-700">Home</Link>
        <span>{' > '}</span>
        <Link href="" className="text-[#5C59E8] hover:text-blue-700">{summary?.name}</Link>
      </Title>

      <div className="flex flex-row">
        <Card className="w-1/5 mr-5" decoration="top">
          <ProtocolDetailSection summary={summary!} />
        </Card>
        <div className="flex-1 flex-wrap">
          <div className="flex flex-row mb-5">
            <div className="w-1/2">
              <ValueBadgeWithDelta label="TVL - Current" formattedValue={numeral(summary?.tvl || 0).format('($0.00a)')} monthlyPercentChange={tvlMonthlyPercentChange} />
            </div>
            <div className="w-1/2 ml-6">
              <ValueBadgeWithDelta label="Net APY - Current" formattedValue={`${numeral(summary?.netApy || 0).format('0.00')}%`} monthlyPercentChange={apyMonthlyPercentChange} />
            </div>
          </div>
          <TvlAndApyLineChart historyData={history} />
          <div className="flex flex-row">
            <div className="w-1/2">
              <ApySourcesCard className="mt-5" summary={summary!} />
            </div>
            <div className="w-1/2">
              <RisksCard className="mt-5 ml-4" riskDetails={getStakingProtocolRiskDetails(summary!.id)} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};