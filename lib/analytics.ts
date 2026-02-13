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

      const hasInviteeBonus = coin_transactions.some(
        (tx: Transaction) => tx.source === 'invitedByExistingUser',
      );
      if (hasInviteeBonus) stats.inviteesConfirmed++;

      const hasInviterBonus = coin_transactions.some(
        (tx: Transaction) => tx.source === 'invitedNewUser',
      );
      if (hasInviterBonus) stats.inviters++;

      if (!Object.hasOwn(stats.locations, country)) {
        stats.locations[country] = {};
      }

      const userCountry = stats.locations[country];

      if (!Object.hasOwn(userCountry, region)) {
        userCountry[region] = 0;
      }

      userCountry[region]++;
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
    //locations,
  } = stats;

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
  };
}
