'use client';
import { FunnelChart, PieArcSeries, PieChart, SunburstChart } from 'reaviz';
import { ChartData } from '../lib/analytics.types';
import './Home.css';

const invitersPieColors = ['#0570b0', '#d0d1e6'];
const inviteesPieColors = ['#238b45', '#66c2a4', '#ccece6'];

export default function Home({ chartData, lastUpdated }: { chartData: ChartData, lastUpdated: Date }) {
  const lastUpdateString = `${lastUpdated.toDateString()} ${lastUpdated.toTimeString()}`;
  
  return (
    <div className="chart-container">
      <div className="header">
        <h1>Dollars For Your Thoughts ($4YT) Analytics Dashboard</h1>
        <p className="description">Last updated: {lastUpdateString}</p>
      </div>
      <div className="dublunes">
        <h2>Dubl-U-nes</h2>
        <table>
          <tbody>
            <tr>
              <td>Total Given</td>
              <td>{chartData.dublunes}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="funnel">
        <h2>User Funnel</h2>
        <p className="description">How many players have played the game?</p>
        <div className="padding-container">
          <FunnelChart height={400} width={500} data={chartData.funnel} />
        </div>
      </div>

      <div className="locations">
        <h2>Locations</h2>
        <p className="description">Where are the players from?</p>
        <div className="padding-container">
          <SunburstChart height={400} width={400} data={chartData.locations} />
        </div>
      </div>

      <div className="invitees">
        <h2>Invitees</h2>
        <p className="description">How many players were invited to join?</p>
        <PieChart
          height={400}
          width={800}
          data={chartData.invitees}
          series={<PieArcSeries colorScheme={inviteesPieColors} />}
        />
      </div>

      <div className="inviters">
        <h2>Inviters</h2>
        <p className="description">How many players invited others to join?</p>
        <PieChart
          height={400}
          width={800}
          data={chartData.inviters}
          series={<PieArcSeries colorScheme={invitersPieColors} />}
        />
      </div>
    </div>
  );
}
