'use client'
import { FunnelChart, PieArcSeries, PieChart } from "reaviz";
import { ChartData } from '../lib/analytics.types';
import './Home.css';

const invitersPieColors = ['#0570b0', '#d0d1e6'];
const inviteesPieColors = ['#238b45', '#66c2a4', '#ccece6'];

export default function Home({ chartData }: { chartData: ChartData }) {
  return (
    <div className="chart-container">
      <div className="dublunes">
        <h1>Dubl-U-nes</h1>
        <table>
          <tbody>
            <tr>
              <td>Total</td>
              <td>{chartData.dublunes}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="funnel">
        <h1>User Funnel</h1>
        <FunnelChart
          height={300}
          width={400}
          data={chartData.funnel}
        />
      </div>

      <div className="invitees">
        <h1>Invitees</h1>
        <PieChart
          height={300}
          width={800}
          data={chartData.invitees}
          series={<PieArcSeries colorScheme={inviteesPieColors}/>}
        />
      </div>

      <div className="inviters">
        <h1>Inviters</h1>
        <PieChart
          height={300}
          width={800}
          data={chartData.inviters}
          series={<PieArcSeries colorScheme={invitersPieColors}/>}
        />
      </div>
    </div>
  );
}
