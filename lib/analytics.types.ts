export type ChartData = {
  funnel: {
    data: number;
    key: string;
  }[];
  dublunes: number;
  invitees: { key: string; data: number }[];
  inviters: { key: string; data: number }[];
};

export type Stats = {
  userCount: number;
  verified: number;
  loggedIn: number;
  dublunes: number;
  inviteesConfirmed: number;
  inviteesPending: number;
  inviters: number;
  locations: Record<string, Record<string, number>>;
};

export type Transaction = {
  source: string;
  count: number;
};

export interface UserSchema {
  is_email_verified: boolean;
  first_login: boolean;
  email: string;
  coins: number;
  inviter_referral_code: string;
  coin_transactions: { source: string; count: number }[];
  country: string;
  region: string;
}
