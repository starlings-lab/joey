'use client';

import { Card, Title, Text } from "@tremor/react";
import { getLSDFiStrategyHowItWorks, getLSDFiStrategyProtocols } from '../data/staticDataService';
import { LSDFiStrategy } from '../types';
import Image from 'next/image';

export default function StrategyCard( {lsdFiStrategy}: {lsdFiStrategy:LSDFiStrategy}) {
  return (
    <Card decoration="top" className="mt-5" decorationColor="red">
      <Title className="text-2xl font-bold mb-2">Strategy</Title>
    <div className="md:flex mt-2 justify-center">
      <div className="mt-4 md:w-1/2">
        <Text className="text-xl">How It Works</Text>
        <p>{getLSDFiStrategyHowItWorks(lsdFiStrategy)}</p>
      </div>
      <div className="mt-4 md:w-1/2">
      <Text className="text-xl">Protocols</Text>
        <div>
          {getLSDFiStrategyProtocols(lsdFiStrategy).map((protocol, index) => (
            <div className="flex items-center" key={index}>
              <Image src={`/${protocol}.svg`} width="16" height="16" alt="Protocol" className="w-4 h-4 mr-2" />
              <p>{protocol}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Card>
  );
}

