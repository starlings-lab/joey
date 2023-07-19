import { NextResponse } from 'next/server'
import getOEth30DayMovingApr from '../../data/duneDataService';
import { LSDFiStrategy, LSDFiStrategySummary } from '../../types';


// returns summary of supported LSDFi protocols/strategies
export async function GET() {
  const LSDFiStrategies: LSDFiStrategySummary[] = [
    {
      id: LSDFiStrategy.OETH,
      name: "OETH",
      tvl: 0,
      netApy: 0,
      stakingApy: 0,
      tokenRewardsApy: 0,
      fees: 0,
      categories: ["LP", "Index"]
    },
  ];

  // TODO: retriev TVL and APY data from Dune
  // const oethApr = await getOEth30DayMovingApr();

  return NextResponse.json({ LSDFiStrategies })
}