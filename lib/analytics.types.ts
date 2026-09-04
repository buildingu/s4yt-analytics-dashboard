import { ObjectId } from 'mongodb';

export type ChartData = {
  funnel: {
    data: number;
    key: string;
  }[];
  dublunes: number;
  invitees: { key: string; data: number }[];
  inviters: { key: string; data: number }[];
  locations: {
    key: string;
    data: {
      key: string;
      data: number;
    }[];
  }[];
};

export type Stats = {
  userCount: number;
  verified: number;
  loggedIn: number;
  pregame: number;
  mainGame: number;
  raffle: number;
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
  chests_submitted: Record<string, number>;
  coin_transactions: { source: string; count: number }[];
  country: string;
  region: string;
}

export interface AnswerSchema {
  user: ObjectId;
}