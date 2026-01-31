import { getUsers } from './db';

const exclusions = JSON.parse(process.env.EXCLUSIONS);

export const labels: Record<string, string> = {
  userCount: 'Registered users',
  verified: 'Verified users',
  loggedIn: 'Logged in',
  inviters: 'Successful invites',
  invitees: 'Invited users'
}

export async function analyzeUsers() {
  const stats = {
    userCount: 0,
    verified: 0,
    loggedIn: 0,
    dublunes: 0,
    inviteesConfirmed: 0,
    inviteesPending: 0,
    inviters: 0,
  };

  try {
    const rawUsers = await getUsers();
    const users = rawUsers.filter(user => !exclusions.includes(user.email));
    
    stats.userCount = users.length;

    for (const user of users) {
      if (user.is_email_verified) stats.verified++;
      if (!user.first_login) stats.loggedIn++;

      stats.dublunes += user.coins;

      const hasOtherInviteCode = user.inviter_referral_code;
      if (hasOtherInviteCode) stats.inviteesPending++;

      const hasInviteeBonus = user.coin_transactions.some(tx => tx.source === 'invitedByExistingUser');
      if (hasInviteeBonus) stats.inviteesConfirmed++;

      const hasInviterBonus = user.coin_transactions.some(tx => tx.source === 'invitedNewUser');
      if (hasInviterBonus) stats.inviters++;
    }
  } catch (err) {
    console.log(err);
  } finally {
    return stats;
  }
}

export function convertToChartData(stats) {
  return {
    funnel: Object.keys(stats).slice(0, 3).map((statName, i) => ({
      data: stats[statName],
      key: labels[statName]
    })),
    dublunes: stats.dublunes, 
    invitees: [
      { key: 'Confirmed', data: stats.inviteesConfirmed },
      { key: 'Pending', data: stats.inviteesPending },
      { key: 'No invite', data: stats.userCount - stats.inviteesConfirmed - stats.inviteesPending },
    ],
    inviters: [
      { key: 'Successful invites', data: stats.inviters },
      { key: 'No successful invites', data: stats.userCount - stats.inviters },
    ],
  }
}