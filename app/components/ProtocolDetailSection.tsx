'use client';

import { Flex, Text } from "@tremor/react";
import { RocketLaunchIcon, BugAntIcon, GlobeAltIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";

import { NameAndUrl, StakingProtocolSummary, LSDFiStrategySummary } from "../types";
import { Divider } from "@tremor/react";
import { getStakingProtocolDetails } from "../data/staticDataService";
import React, { ElementType } from "react";
import Link from "next/link";
import Image from "next/image";


// Component to display protocol details
export default function ProtocolDetailSection({ summary }: { summary: StakingProtocolSummary | LSDFiStrategySummary }) {
  const details = getStakingProtocolDetails(summary.id);
  return (
    <div>
      <div className="flex items-center justify-center">
        <Image width="240" height="240" alt="" src={`/${summary.name}.svg`} />
      </div>
      <Divider />
      <Detail>
        <RoundIcon icon={RocketLaunchIcon} />
        <div className="ml-2">
          <Text className="text-xlg">Launched In</Text>
          <Text className="text-lg">{details.launchDate}</Text>
        </div>
      </Detail>
      <ListOfNameAndLnks icon={BugAntIcon} label="Auditors" list={details.auditors} />
      <ListOfNameAndLnks icon={UserGroupIcon} label="Investors" list={details.investors} />
      <Detail>
        <RoundIcon icon={GlobeAltIcon} />
        <div className="ml-2">
          <Text className="text-xlg">Website</Text>
          <Text className="text-lg">
            <Link href={details.websiteUrl} target="_" className="underline hover:text-blue-700">
              <Text>{summary.name}</Text>
            </Link>
          </Text>
        </div>
      </Detail>
      <ListOfNameAndLnks icon={ChatBubbleLeftRightIcon} label="Community" list={details.communicationChannels} />
    </div>
  );
}

interface ChildrenProps {
  children: React.ReactNode;
}

function RoundIcon({ icon }: { icon: ElementType<any> }) {
  return (
    <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center">
      <Icon className="text-gray-400" size="lg" icon={icon} />
    </div>
  );
}

function Detail({ children }: ChildrenProps) {
  return (
    <Flex justifyContent="start" className="mb-5">
      {children}
    </Flex>
  );
}

function ListOfNameAndLnks(
  { icon, label, list }:
    { icon: ElementType<any>, label: string, list: NameAndUrl[] }
) {
  return (
    <Detail>
      <RoundIcon icon={icon} />
      <div className="ml-2">
        <Text className="text-xlg">{label}</Text>
        {
          list.map((item: NameAndUrl) => {
            return (
              <Text key={item.name} className="text-lg">
                <Link href={item.url} target="_" className="flex justify-start underline hover:text-blue-700">
                  {label === "Community" ? <Image className="mr-1" alt="icon" width="16" height="16" src={`/${item.name}.svg`} /> : null}{item.name}
                </Link>
              </Text>
            );
          })
        }
      </div>
    </Detail>
  );
}