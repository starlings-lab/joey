import { Card, Flex, Title } from "@tremor/react";
import numeral from "numeral";

import TvlAndApyLineChart from "../../components/TvlAndApyLineChart";
import ValueBadgeWithDelta from "../../components/ValueBadgeWithDelta";
import ProtocolDetailSection from "../../components/ProtocolDetailSection";
import StrategyCard from "../../components/StrategyCard";
import ApySourcesCard from "../../components/ApySourcesCard";
import RisksCard from "../../components/RisksCard";
import { getStakingProtocolRiskDetails } from "../../data/staticDataService";
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

interface PageProps {
  params: {
    protocol: string;
  };
}

export default async function LSDFiDetails({ params }: PageProps) {
  const summary = {
    id: 0,
    name: 'OETH',
    tvl: 14820998351,
    netApy: 3.9,
    stakingApy: 3.9,
    tokenRewardsApy: 0,
    fees: 10,
    logoUrl: 'oeth.svg',
    defiLlamaPoolId: '747c1d2a-c668-4682-b9f9-296708a3dd90'
  }

  const history = [
    {
      timestamp: new Date('2022-05-03T00:00:00.000Z'),
      tvlUsd: 11074372760,
      apy: 3.6,
      apyBase: 3.6,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-04T00:00:00.000Z'),
      tvlUsd: 11744709791,
      apy: 3.6,
      apyBase: 3.6,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-05T00:00:00.000Z'),
      tvlUsd: 11008298772,
      apy: 3.6,
      apyBase: 3.6,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-06T00:00:00.000Z'),
      tvlUsd: 10974211995,
      apy: 3.5,
      apyBase: 3.5,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-07T00:00:00.000Z'),
      tvlUsd: 10736517627,
      apy: 3.5,
      apyBase: 3.5,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-08T00:00:00.000Z'),
      tvlUsd: 10375445969,
      apy: 3.6,
      apyBase: 3.6,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-09T00:00:00.000Z'),
      tvlUsd: 9406769875,
      apy: 3.5,
      apyBase: 3.5,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-10T00:00:00.000Z'),
      tvlUsd: 9506069560,
      apy: 3.6,
      apyBase: 3.6,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-11T00:00:00.000Z'),
      tvlUsd: 8714550420,
      apy: 3.6,
      apyBase: 3.6,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-12T00:00:00.000Z'),
      tvlUsd: 7857787286,
      apy: 3.6,
      apyBase: 3.6,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-13T00:00:00.000Z'),
      tvlUsd: 8459868374,
      apy: 3.6,
      apyBase: 3.6,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-14T00:00:00.000Z'),
      tvlUsd: 8307436489,
      apy: 3.6,
      apyBase: 3.6,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-15T00:00:00.000Z'),
      tvlUsd: 8869252957,
      apy: 3.7,
      apyBase: 3.7,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-16T00:00:00.000Z'),
      tvlUsd: 8406513502,
      apy: 3.7,
      apyBase: 3.7,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-17T00:00:00.000Z'),
      tvlUsd: 8601108016,
      apy: 3.7,
      apyBase: 3.7,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-18T00:00:00.000Z'),
      tvlUsd: 8072321130,
      apy: 3.8,
      apyBase: 3.8,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-19T00:00:00.000Z'),
      tvlUsd: 8305322669,
      apy: 3.8,
      apyBase: 3.8,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-20T00:00:00.000Z'),
      tvlUsd: 8110663532,
      apy: 3.8,
      apyBase: 3.8,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-21T00:00:00.000Z'),
      tvlUsd: 8093785039,
      apy: 3.8,
      apyBase: 3.8,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-22T00:00:00.000Z'),
      tvlUsd: 8299480469,
      apy: 3.9,
      apyBase: 3.9,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-23T00:00:00.000Z'),
      tvlUsd: 8130648910,
      apy: 3.9,
      apyBase: 3.9,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-24T00:00:00.000Z'),
      tvlUsd: 8144177342,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-25T00:00:00.000Z'),
      tvlUsd: 8076696769,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-26T00:00:00.000Z'),
      tvlUsd: 7549047867,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-27T00:00:00.000Z'),
      tvlUsd: 7162858310,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-28T00:00:00.000Z'),
      tvlUsd: 7329191226,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-29T00:00:00.000Z'),
      tvlUsd: 7403372675,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-30T00:00:00.000Z'),
      tvlUsd: 8190730072,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-05-31T00:00:00.000Z'),
      tvlUsd: 8040565588,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-06-01T00:00:00.000Z'),
      tvlUsd: 7457563960,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-06-02T00:00:00.000Z'),
      tvlUsd: 7529727017,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },
    {
      timestamp: new Date('2022-06-03T00:00:00.000Z'),
      tvlUsd: 7361895607,
      apy: 4,
      apyBase: 4,
      apyReward: null,
      il7d: null,
      apyBase7d: null
    },  
  ];

  // calculate monthly delta
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
          <div><StrategyCard className="md:flex mt-5"></StrategyCard></div>
          <div className="md:flex">
            <div className="md:w-1/2 mt-5 md:mr-5">
              <ApySourcesCard summary={summary!} />
            </div>
            <div className="md:w-1/2 mt-5">
              <RisksCard riskDetails={getStakingProtocolRiskDetails(summary!.id)} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};