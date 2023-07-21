'use client';

import { Card, Flex, Metric, Text, Title, Icon } from "@tremor/react";

import numeral from "numeral";
import { StakingProtocolSummary, LSDFiStrategySummary } from "../types";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function ApySourcesCard({ summary, className }: { summary: StakingProtocolSummary | LSDFiStrategySummary, className?: string }) {
  const classes = `${className}`;
  return (
    <Card decoration="top" decorationColor="green" className={classes}>
      <Title className="text-2xl font-bold mb-2">APY Sources</Title>
      <Flex className="justify-start">
        <div className="mr-12">
          <Text>Net APY</Text>
          <Metric className="mt-2 mb-2">{numeral(summary.netApy).format('0.00')}%</Metric>
        </div>
        <div className="mr-12">
          <Text>Token Rewards</Text>
          <Metric className="mt-2 mb-2">{numeral(summary.tokenRewardsApy).format('0.00')}%</Metric>
        </div>
        <div>
          <div className="flex">
            {summary.fees.map((fee) => <div className="mr-4" key={fee.name}><Text className="">{fee.name}<Icon icon={InformationCircleIcon} tooltip={fee.description} size="sm" color="neutral" /></Text><Metric className="mt-2 mb-2 flex">{numeral(fee.value).format('0')}%</Metric></div>)}
          </div>
        </div>
        {/* {
          !!summary.depositFee &&
          <div className="w-1/2 ml-5">
            <Text>Deposit Fee</Text>
            <Metric className="mt-2 mb-2">{numeral(summary.depositFee).format('0.00')}%</Metric>
          </div>
        } */}
      </Flex>

    </Card>
  );
}