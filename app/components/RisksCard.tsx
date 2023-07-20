'use client';

import { Button, Card, Flex, Icon, Title } from "@tremor/react";

import { Level, RiskDetails } from "../types";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

export default function RisksCard({ riskDetails, className }: { riskDetails: RiskDetails, className?: string }) {
  const classes = `${className}`;
  return (
    <Card decoration="top" decorationColor="red" className={classes}>
      <Title className="text-2xl font-bold mb-2">Risks</Title>
      {riskDetails.multipleAudits === true && <RiskDetail label="Multiple Smart Contract Audits" up={true} />}
      {riskDetails.multipleAudits === false && <RiskDetail label="No Multiple Smart Contract Audits" up={false} />}

      {riskDetails.hasSlashingInsurance === true && <RiskDetail label="Slashing Insurance" up={true} />}
      <Flex justifyContent="start" alignItems="start">
        {riskDetails.hasSlashingInsurance === false && <RiskDetail label="No Slashing Insurance" up={false} />}
        {riskDetails.slashingInsuranceNote && <Icon icon={InformationCircleIcon} tooltip={riskDetails.slashingInsuranceNote} size="sm" color="neutral" />}
      </Flex>

      {riskDetails.liquidity === Level.Low && <RiskDetail label="Low Secondary Market Liquidity" up={false} />}
      {riskDetails.liquidity === Level.Medium && <RiskDetail label="Medium Secondary Market Liquidity" up={false} />}
      {riskDetails.liquidity === Level.High && <RiskDetail label="High Secondary Market Liquidity" up={true} />}
    </Card>
  );
}

export function RiskDetail({ label, up }: { label: string, up: boolean | null }) {
  const classes = `mb-2 border-none cursor-default text-black opacity-90 ${up == null ? 'bg-gray-400' : up ? 'bg-[#12BB4F80]' : 'bg-gray-400'}`;
  return (
    <div>
      <Button
        className={classes}
        disabled
        size="xs"
        icon={up == null ? undefined : up ? ChevronUpIcon : ChevronDownIcon}
        iconPosition="right"
      >
        {label}
      </Button>
    </div>
  )
}
