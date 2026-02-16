import { analyzeUsers, convertToChartData } from '@/lib/analytics';
import Home from './Home';
export const revalidate = 60;

export default async function Page() {
  const stats = await analyzeUsers();
  const chartData = convertToChartData(stats);
  const lastUpdated = new Date();


  return <Home chartData={chartData} lastUpdated={lastUpdated} />;
}
