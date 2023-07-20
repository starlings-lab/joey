'use client';

import { Card, Title } from "@tremor/react";
import { getLSDFiStrategyHowItWorks, getLSDFiStrategyProtocols } from '../data/staticDataService';
import { LSDFiStrategy } from '../types';

export default function StrategyCard( {lsdFiStrategy}: {lsdFiStrategy:LSDFiStrategy}) {
  return (
    <Card decoration="top" decorationColor="red">
      <Title className="text-2xl font-bold mb-2">Strategy</Title>
      <div className="mt-4 md:w-1/2">
        <p>How It Works</p>
        <p>{getLSDFiStrategyHowItWorks(lsdFiStrategy)}</p>
      </div>
      <div className="mt-4 md:w-1/2">
        <p>Protocols</p>
        <p>{getLSDFiStrategyProtocols(lsdFiStrategy)}</p>
      </div>
    </Card>
  );
}

