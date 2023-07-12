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
      {!riskDetails.hackedTillDate && <RiskDetail label="No hacking Till Date" up={true} />}
      {<RiskDetail label="Multiple Audits" up={riskDetails.multipleAudits} />}

      <Subtitle className="mt-5 mb-2">Slashing</Subtitle>
      {<RiskDetail label="Slashing Insurance" up={riskDetails.hasSlashingInsurance} />}
      {<RiskDetail label="Low Slashing Rate" up={riskDetails.slashingRate !== Level.High} />}

      <Subtitle className="mt-5 mb-2">Liquidity</Subtitle>
      {riskDetails.liquidity === Level.Low && <RiskDetail label="Low" up={false} />}
      {riskDetails.liquidity === Level.High && <RiskDetail label="High" up={true} />}
    </Card>
  );
}

export function RiskDetail({ label, up }: { label: string, up: boolean }) {
  const classes = `mb-2 border-none cursor-default text-black ${up ? 'bg-green-600' : 'bg-red-400'}`;
  return (
    <Button
      className={classes}
      disabled
      size="xs"
      icon={up ? ChevronUpIcon : ChevronDownIcon}
      iconPosition="right"
    >
      {label}
    </Button>
  )
}
