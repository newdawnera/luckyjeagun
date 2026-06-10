/**
 * Dataset powering the Data Lab charts and KPIs.
 */
export const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export type MetricKey = "signups" | "revenue" | "retention";
export type MetricAccent = "violet" | "cyan" | "pink";

export type Metric = {
  label: string;
  values: number[];
  prefix?: string;
  suffix?: string;
  accent: MetricAccent;
  blurb: string;
};

export const metrics: Record<MetricKey, Metric> = {
  signups: {
    label: "New signups",
    values: [120, 145, 138, 170, 210, 240, 265, 320, 360, 410, 450, 520],
    accent: "violet",
    blurb: "Monthly new user registrations.",
  },
  revenue: {
    label: "Revenue",
    values: [8, 9, 9, 12, 15, 18, 21, 26, 30, 35, 39, 47],
    prefix: "$",
    suffix: "k",
    accent: "cyan",
    blurb: "Monthly recurring revenue, in thousands.",
  },
  retention: {
    label: "Retention",
    values: [62, 63, 65, 64, 67, 69, 70, 72, 73, 75, 76, 78],
    suffix: "%",
    accent: "pink",
    blurb: "Share of users active 30 days after signup.",
  },
};

export type Channel = { name: string; value: number };

export const channels: Channel[] = [
  { name: "Organic search", value: 38 },
  { name: "Referral", value: 22 },
  { name: "Social", value: 18 },
  { name: "Direct", value: 14 },
  { name: "Paid", value: 8 },
];

export function formatValue(v: number, m: Metric): string {
  return `${m.prefix ?? ""}${v.toLocaleString()}${m.suffix ?? ""}`;
}
