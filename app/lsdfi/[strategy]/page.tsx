import { Card, Flex, Title } from "@tremor/react";
import numeral from "numeral";

import TvlAndApyLineChart from "../../components/TvlAndApyLineChart";
import ValueBadgeWithDelta from "../../components/ValueBadgeWithDelta";
import ProtocolDetailSection from "../../components/ProtocolDetailSection";
import StrategyCard from "../../components/StrategyCard";
import ApySourcesCard from "../../components/ApySourcesCard";
import RisksCard from "../../components/RisksCard";
import { getRiskDetails } from "../../data/staticDataService";
import { getLSDFiStrategySummary, getTvlAndApyHistory } from '../../data/dataService';
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

interface PageProps {
  params: {
    strategy: string;
  };
}

export default async function LSDFiDetails({ params }: PageProps) {
  // Wait for the promises to resolve
  const [summary, history] = await Promise.all([
    await getLSDFiStrategySummary(params.strategy),
    await getTvlAndApyHistory(params.strategy, true)
  ]);

  const currentDataPoint = history[history.length - 1];
  const prevDataPoint = history[history.length - 31];
  const tvlMonthlyPercentChange = ((currentDataPoint.tvlUsd - prevDataPoint.tvlUsd) * 100) / prevDataPoint.tvlUsd;
  const apyMonthlyPercentChange = ((currentDataPoint.apy - prevDataPoint.apy) * 100) / prevDataPoint.apy;

  return (
    <main className="p-4 md:p-10 mx-auto max-w-8xl">
      <div className="text-3xl font-bold mb-2">{summary?.name}</div>
      <div className="flex mr-2 mb-2 mt-2">
        <div>LSDFi</div><span><ChevronDoubleRightIcon width="16" className="text-gray m-1"></ChevronDoubleRightIcon></span><Link className="text-[#5C59E8]" href="">{summary?.name}</Link>
      </div>
      <div className="md:flex">
        <div className="mt-4 md:w-1/5 md:mr-5">
          <Card decoration="top">
            <ProtocolDetailSection summary={summary!} />
          </Card>
        </div>
        <div className="md:w-4/5">
          <div className="md:flex">
            <div className="mt-4 md:w-1/2 md:mr-5">
              <ValueBadgeWithDelta label="TVL - Current" formattedValue={numeral(summary?.tvl || 0).format('($0.00a)')} monthlyPercentChange={tvlMonthlyPercentChange} />
            </div>
            <div className="mt-4 md:w-1/2">
              <ValueBadgeWithDelta label="Net APY - Current" formattedValue={`${numeral(summary?.netApy || 0).format('0.00')}%`} monthlyPercentChange={apyMonthlyPercentChange} />
            </div>
          </div>
          <TvlAndApyLineChart historyData={history} />
          <div><StrategyCard lsdFiStrategy={summary!.id}></StrategyCard></div>
          <div className="md:flex">
            <div className="md:w-1/2 mt-5 md:mr-5">
              <ApySourcesCard summary={summary!} />
            </div>
            <div className="md:w-1/2 mt-5">
              <RisksCard riskDetails={getRiskDetails(summary!.id)} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};