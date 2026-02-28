import { Stats } from "@/types/dashboard";
import { ArrowUpRight, ArrowDownRight, ShieldAlert, BarChart3, Ban, Activity } from "lucide-react";

interface StatsCardsProps {
  stats: Stats;
}

const cards = [
  {
    key: "totalTransactions" as const,
    label: "Total Transactions",
    icon: Activity,
    color: "text-primary",
    trend: "+12.5%",
    up: true,
  },
  {
    key: "fraudDetected" as const,
    label: "Fraud Detected",
    icon: ShieldAlert,
    color: "text-destructive",
    trend: "+3.2%",
    up: true,
  },
  {
    key: "riskScore" as const,
    label: "Risk Score",
    icon: BarChart3,
    color: "text-warning",
    trend: "-2.1%",
    up: false,
  },
  {
    key: "blockedTransactions" as const,
    label: "Blocked Transactions",
    icon: Ban,
    color: "text-accent",
    trend: "+5.8%",
    up: true,
  },
];

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.key} className="glass-card-hover p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <div className="flex items-end justify-between">
            <p className="stat-value text-foreground">
              {card.key === "riskScore"
                ? `${stats[card.key]}%`
                : stats[card.key].toLocaleString()}
            </p>
            <span
              className={`flex items-center text-xs font-medium ${card.up ? "text-success" : "text-destructive"}`}
            >
              {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {card.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
