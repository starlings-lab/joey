'use client';

import { Callout, Card, Flex, Icon, Metric, Text, Title } from "@tremor/react";

import numeral from "numeral";
import { StakingProtocolSummary } from "../types";

export default function ApySourcesCard({ summary, className }: { summary: StakingProtocolSummary, className?: string }) {
  const classes = `max-w-xs ${className}`;
  return (
    <Card decoration="top" decorationColor="green" className={classes}>
      <Title className="text-2xl font-bold mb-2">APY Sources</Title>
      <Flex>
        <div className="w-1/2">
          <Text>Staking APY</Text>
          <Metric className="mt-2 mb-2">{numeral(summary.stakingApy).format('0.00')}%</Metric>
          {summary.tokenRewardsApy === 0 && <Text className="text-xs text-gray-500">* No token rewards offered by the protocol</Text>}
        </div>
        <div className="w-1/2 ml-5">
          <Text>Fees</Text>
          {/* <Icon icon={InformationCircleIcon} tooltip="" size="sm" color="neutral" /> */}
          <Metric className="mt-2 mb-2">{numeral(summary.fees).format('0')}%</Metric>
          {summary.fees > 0 && <Text className="text-xs text-gray-500">* Fees are percentage of staking rewards taken by the protocol</Text>}
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