'use client'
import { Funnel } from '@nivo/funnel';

export default function Home({ stats, chartData }) {
  console.log(chartData);

const customTheme = {
    tooltip: {
      container: {
        color: '#000000',
        fontSize: 16,
      },
    },
    labels: {
      text: {
        fontSize: 20, // Adjust this value
      },
    },
  };

  return (
    <>
      <div>
        <table>
          <tbody>
            <tr>
              <td>Registered users</td>
              <td>{stats.userCount}</td>
            </tr>
              <tr>
              <td>Verified users</td>
              <td>{stats.verified}</td>
            </tr>
            <tr>
              <td>Logged in</td>
              <td>{stats.loggedIn}</td>
            </tr>
            <tr>
              <td>Successful invites</td>
              <td>{stats.inviters}</td>
            </tr>
            <tr>
              <td>Invited users</td>
              <td>{stats.invitees}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Funnel
        data={chartData}
        theme={customTheme}
        width={800}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat="~d"
        colors={{ scheme: 'red_yellow_blue' }}
        borderWidth={20}
        labelColor={{ from: 'color', modifiers: [['darker', 3]] }}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
      />
    </>
  );
}
