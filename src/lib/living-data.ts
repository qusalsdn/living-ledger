export const COST_CATEGORIES = ["주거", "공과금", "통신", "보험", "교통", "생활", "기타"] as const;
export const FREQUENCIES = ["매월", "매년"] as const;

export type FixedCost = {
  id: string;
  name: string;
  amount: number;
  frequency: (typeof FREQUENCIES)[number];
  payment_day: number;
  category: (typeof COST_CATEGORIES)[number];
  is_autopay: boolean;
  created_at: string;
};

export type Contract = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  memo: string | null;
  created_at: string;
};

export const won = new Intl.NumberFormat("ko-KR");

export function monthlyAmount(cost: Pick<FixedCost, "amount" | "frequency">) {
  return cost.frequency === "매년" ? Math.round(cost.amount / 12) : cost.amount;
}

export function formatWon(amount: number) {
  return `${won.format(amount)}원`;
}

export function daysUntil(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${date}T00:00:00`);
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
}
