'use client';

import { Card, Flex, Icon, Metric, Text, Title } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import numeral from "numeral";
import { StakingProtocolSummary } from "../types";

export default function ApySourcesCard({ summary, className }: { summary: StakingProtocolSummary, className?: string }) {
  const classes = `max-w-xs ${className}`;
  return (
    <Card className={classes}>
      <Title className="text-2xl font-bold mb-2">APY Sources</Title>
      <Flex>
        <div className="w-1/2">
          <Text>Staking APY</Text>
          <Metric>{numeral(summary.stakingApy).format('0.00')}%</Metric>
        </div>
        <div className="w-1/2">
          <Text>Fees</Text>
          {/* <Icon icon={InformationCircleIcon} tooltip="" size="sm" color="neutral" /> */}
          <Metric>{numeral(summary.fees).format('0')}%</Metric>
        </div>
      </Flex>

    </Card>
  );
}