export type ChartData = {
  funnel: {
    data: number,
    key: string,
  }[],
  dublunes: number, 
  invitees: { key: string, data: number }[],
  inviters: { key: string, data: number }[],
};

export type Transaction = {
  source: string,
  count: number
}