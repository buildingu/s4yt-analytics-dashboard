import { ChartData, Stats, Transaction } from './analytics.types';
import { getUsers } from './db';

const exclusions = JSON.parse(process.env.EXCLUSIONS);

export async function analyzeUsers(): Promise<Stats> {
  const stats: Stats = {
    userCount: 0,
    verified: 0,
    loggedIn: 0,
    dublunes: 0,
    inviteesConfirmed: 0,
    inviteesPending: 0,
    inviters: 0,
    locations: {},
  };

  try {
    const rawUsers = await getUsers();
    const users = rawUsers.filter(user => !exclusions.includes(user.email));

    stats.userCount = users.length;

    for (const user of users) {
      const {
        is_email_verified,
        first_login,
        coins,
        inviter_referral_code,
        coin_transactions,
        country,
        region,
      } = user;

      if (is_email_verified) stats.verified++;
      if (!first_login) stats.loggedIn++;

      stats.dublunes += coins;

      const hasOtherInviteCode = inviter_referral_code;
      if (hasOtherInviteCode) {
        stats.inviteesPending++;
      }

      // Invitations
      const hasInviteeBonus = coin_transactions.some(
        (tx: Transaction) => tx.source === 'invitedByExistingUser',
      );
      if (hasInviteeBonus) stats.inviteesConfirmed++;

      const hasInviterBonus = coin_transactions.some(
        (tx: Transaction) => tx.source === 'invitedNewUser',
      );
      if (hasInviterBonus) stats.inviters++;

      // Locations
      const countrySanitized = country == null ? 'Unknown' : country;

      if (!Object.hasOwn(stats.locations, countrySanitized)) {
        stats.locations[countrySanitized] = {};
      }

      const countryObj = stats.locations[country];
      const regionSanitized = region == null ? 'Unknown' : region;

      if (!Object.hasOwn(countryObj, regionSanitized)) {
        countryObj[regionSanitized] = 0;
      }

      countryObj[regionSanitized]++;
    }
  } catch (err) {
    console.log(err);
  } finally {
    return stats;
  }
}

export function convertToChartData(stats: Stats): ChartData {
  const {
    userCount,
    verified,
    loggedIn,
    dublunes,
    inviteesConfirmed,
    inviteesPending,
    inviters,
    locations,
  } = stats;

  const locationsChartdata = [];

  for (const country in locations) {
    const regionChartData = [];

    for (const region in locations[country]) {
      regionChartData.push({
        key: region,
        data: locations[country][region],
      });
    }

    locationsChartdata.push({
      key: country,
      data: regionChartData,
    });
  }

  return {
    funnel: [
      { key: 'Registered users', data: userCount },
      { key: 'Verified users', data: verified },
      { key: 'Logged in', data: loggedIn },
    ],
    dublunes: dublunes,
    invitees: [
      { key: 'Confirmed', data: inviteesConfirmed },
      { key: 'Pending', data: inviteesPending },
      {
        key: 'No invite',
        data: userCount - inviteesConfirmed - inviteesPending,
      },
    ],
    inviters: [
      { key: 'Confirmed', data: inviters },
      { key: 'No invites', data: userCount - inviters },
    ],
    locations: locationsChartdata,
  };
}
