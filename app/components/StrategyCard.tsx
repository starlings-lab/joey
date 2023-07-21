'use client';

import { Card, Title } from "@tremor/react";
import { getLSDFiStrategyHowItWorks, getLSDFiStrategyProtocols } from '../data/staticDataService';
import { LSDFiStrategy } from '../types';
import Image from 'next/image';

export default function StrategyCard( {lsdFiStrategy}: {lsdFiStrategy:LSDFiStrategy}) {
  return (
    <Card decoration="top" decorationColor="red">
      <Title className="text-2xl font-bold mb-2">Strategy</Title>
    <div className="flex mt-2 justify-center">
      <div className="mt-4 md:w-1/2">
        <h4 className="text-md font-bold">How It Works</h4>
        <p>{getLSDFiStrategyHowItWorks(lsdFiStrategy)}</p>
      </div>
      <div className="mt-4 md:w-1/2">
        <h4 className="text-md font-bold">Protocols</h4>
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

