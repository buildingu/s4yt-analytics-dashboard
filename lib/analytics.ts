import { getUsers } from './db';

const exclusions = JSON.parse(process.env.EXCLUSIONS);

export async function analyzeUsers() {
  const stats = {
    userCount: 0,
    verified: 0,
    loggedIn: 0,
    invitees: 0,
    inviters: 0,
  };

  try {
    const rawUsers = await getUsers();
    const users = rawUsers.filter(user => !exclusions.includes(user.email));
    
    stats.userCount = users.length;

    for (const user of users) {
      if (user.is_email_verified) stats.verified++;
      if (!user.first_login) stats.loggedIn++;

      const hasOtherInviteCode = user.inviter_referral_code;
      const hasInviteeBonus = user.coin_transactions.some(tx => tx.source === 'invitedByExistingUser');
      if (hasOtherInviteCode || hasInviteeBonus) stats.invitees++;

      const hasInviterBonus = user.coin_transactions.some(tx => tx.source === 'invitedNewUser');
      if (hasInviterBonus) stats.inviters++;
    }
  } catch (err) {
    console.log(err);
  } finally {
    return stats;
  }
}