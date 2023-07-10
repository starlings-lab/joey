import { Card, Title } from "@tremor/react";
import TvlAndApyLineChart from "../components/TvlAndApyLineChart";
import { getStakingProtocolSummary, getTvlAndApyHistory } from "../data/dataService";

interface PageProps {
  params: {
    protocol: string;
  };
}

export default async ({ params }: PageProps) => {
  const summary = await getStakingProtocolSummary(params.protocol);
  const data = await getTvlAndApyHistory(params.protocol);
  return (
    <div>
      <Title>{summary?.name}</Title>
      <TvlAndApyLineChart historyData={data} />
    </div>
  );
};
