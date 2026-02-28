import { userBehavior } from "@/data/mockData";
import { MapPin, Smartphone, IndianRupee, BarChart2, TrendingUp, Clock } from "lucide-react";

const items = [
  { icon: IndianRupee, label: "Average Spend", value: userBehavior.avgSpend },
  { icon: MapPin, label: "Most Used Location", value: userBehavior.mostUsedLocation },
  { icon: Smartphone, label: "Preferred Device", value: userBehavior.preferredDevice },
  { icon: BarChart2, label: "Daily Transactions", value: String(userBehavior.dailyTransactions) },
  { icon: TrendingUp, label: "Risk Trend", value: userBehavior.riskTrend },
  { icon: Clock, label: "Last Login", value: userBehavior.lastLogin },
];

export default function UserBehavior() {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">User Behavior Profile</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-1">
              <item.icon className="w-3.5 h-3.5 text-primary" />
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
            <p className="text-sm font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
