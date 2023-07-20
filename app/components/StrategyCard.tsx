'use client';

import { Button, Card, Flex, Icon, Title } from "@tremor/react";

export default function StrategyCard({ className }: { className?: string }) {
  const classes = `${className}`;
  return (
    <Card decoration="top" decorationColor="red" className={classes}>
      <Title className="text-2xl font-bold mb-2">Strategy</Title>
      <div className="mt-4 md:w-1/2">
        How It Works
      </div>
      <div className="mt-4 md:w-1/2">
        Protocols
      </div>
    </Card>
  );
}

