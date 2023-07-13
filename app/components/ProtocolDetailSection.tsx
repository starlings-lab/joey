'use client';

import { Flex, Text } from "@tremor/react";
import { RocketLaunchIcon, LockClosedIcon, ComputerDesktopIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";

import { NameAndUrl, StakingProtocolSummary } from "../types";
import { Divider } from "@tremor/react";
import { getStakingProtocolDetails } from "../data/staticDataService";
import React, { ElementType } from "react";
import Link from "next/link";
import Image from "next/image";


// Component to display protocol details
export default function ProtocolDetailSection({ summary }: { summary: StakingProtocolSummary }) {
  const details = getStakingProtocolDetails(summary.id);
  return (
    <div>
      <Image width="240" height="240" alt="" src={summary.logoUrl} />
      <Text className="text-lg text-center mt-2">{summary.name}</Text>
      <Divider />
      <Detail>
        <RoundIcon icon={RocketLaunchIcon} />
        <div className="ml-2">
          <Text className="text-xlg">Launched In</Text>
          <Text className="text-lg">{details.launchDate}</Text>
        </div>
      </Detail>
      <ListOfNameAndLnks icon={LockClosedIcon} label="Auditors" list={details.auditors} />
      <ListOfNameAndLnks icon={LockClosedIcon} label="Investors" list={details.investors} />
      <Detail>
        <RoundIcon icon={ComputerDesktopIcon} />
        <div className="ml-2">
          <Text className="text-xlg">Website</Text>
          <Text className="text-lg">
            <Link href={details.websiteUrl} target="_" className="text-blue-500 hover:text-blue-700">
              {details.websiteUrl}
            </Link>
          </Text>
        </div>
      </Detail>
      <ListOfNameAndLnks icon={UserGroupIcon} label="Community" list={details.communicationChannels} />
    </div>
  );
}

interface ChildrenProps {
  children: React.ReactNode;
}

function RoundIcon({ icon }: { icon: ElementType<any> }) {
  return (
    <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center">
      <Icon size="lg" icon={icon} />
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
                <Link href={item.url} target="_" className="text-blue-500 hover:text-blue-700">
                  {item.name}
                </Link>
              </Text>
            );
          })
        }
      </div>
    </Detail>
  );
}