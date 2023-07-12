'use client';

import { Button, Card, Subtitle, Text, Title } from "@tremor/react";

import { Level, StakingProtocolRiskDetails } from "../types";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function RisksCard({ riskDetails, className }: { riskDetails: StakingProtocolRiskDetails, className?: string }) {
  const classes = `max-w-xs ${className}`;
  return (
    <Card decoration="top" decorationColor="red" className={classes}>
      <Title className="text-2xl font-bold mb-2">Risks</Title>
      <Subtitle className="mb-2">Smart Contract</Subtitle>
      {<RiskDetail label="Multiple Audits" up={riskDetails.multipleAudits} />}

      <Subtitle className="mt-5 mb-2">Slashing</Subtitle>
      {<RiskDetail label="Slashing Insurance" up={riskDetails.hasSlashingInsurance} />}
      {riskDetails.slashingInsuranceNote && <Text className="text-xs text-gray-500">* {riskDetails.slashingInsuranceNote}</Text>}

      <Subtitle className="mt-5 mb-2">Secondary Market Liquidity</Subtitle>
      {riskDetails.liquidity === Level.Low && <RiskDetail label="Low" up={false} />}
      {riskDetails.liquidity === Level.Medium && <RiskDetail label="Medium" up={null} />}
      {riskDetails.liquidity === Level.High && <RiskDetail label="High" up={true} />}
    </Card>
  );
}

export function RiskDetail({ label, up }: { label: string, up: boolean | null }) {
  const classes = `mb-2 border-none cursor-default text-black ${up == null ? 'bg-gray-400' : up ? 'bg-green-600' : 'bg-red-400'}`;
  return (
    <Button
      className={classes}
      disabled
      size="xs"
      icon={up == null ? undefined : up ? ChevronUpIcon : ChevronDownIcon}
      iconPosition="right"
    >
      {label}
    </Button>
  )
}
