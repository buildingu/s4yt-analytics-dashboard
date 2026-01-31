import { analyzeUsers, convertToChartData } from '@/lib/analytics';
import Home from './Home';

export default async function Page() {
  const stats = await analyzeUsers();
  const chartData = convertToChartData(stats);

  return <Home chartData={chartData}/>;
}
