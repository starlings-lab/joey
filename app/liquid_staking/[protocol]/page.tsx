import { Card, Flex, Title } from "@tremor/react";
import numeral from "numeral";

import TvlAndApyLineChart from "../../components/TvlAndApyLineChart";
import ValueBadgeWithDelta from "../../components/ValueBadgeWithDelta";
import { getStakingProtocolSummary, getTvlAndApyHistory } from "../../data/dataService";
import ProtocolDetailSection from "../../components/ProtocolDetailSection";
import ApySourcesCard from "../../components/ApySourcesCard";
import RisksCard from "../../components/RisksCard";
import { getRiskDetails } from "../../data/staticDataService";
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

interface PageProps {
  params: {
    protocol: string;
  };
}

export default async function StakingProtocolDetails({ params }: PageProps) {
  // Wait for the promises to resolve
  // Wait for the promises to resolve
  const [summary, tvlAndApyHistory] = await Promise.all([
    getStakingProtocolSummary(params.protocol),
    getTvlAndApyHistory(params.protocol)
  ]);

  const [tvlHistory, apyHistory] = tvlAndApyHistory;
  const currentDataPointApy = apyHistory[apyHistory.length - 1];
  const prevDataPointApy = apyHistory[apyHistory.length - 31];
  const apyMonthlyPercentChange = ((currentDataPointApy.apy - prevDataPointApy.apy) * 100) / prevDataPointApy.apy;

  const currentDataPointTvl = tvlHistory[tvlHistory.length - 1];
  const prevDataPointTvl = tvlHistory[tvlHistory.length - 31];
  const tvlMonthlyPercentChange = ((currentDataPointTvl.tvlUsd - prevDataPointTvl.tvlUsd) * 100) / prevDataPointTvl.tvlUsd;


  return (
    <main className="p-4 md:p-10 mx-auto max-w-8xl">
      <div className="text-3xl font-bold mb-2">{summary?.name}</div>
      <div className="flex mr-2 mb-2 mt-2">
        <div>Liquid Staking Protocols</div><span><ChevronDoubleRightIcon width="16" className="text-gray m-1"></ChevronDoubleRightIcon></span><Link className="text-[#5C59E8]" href="">{summary?.name}</Link>
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
          <TvlAndApyLineChart apyHistoryData={apyHistory} tvlHistoryData={tvlHistory} />
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