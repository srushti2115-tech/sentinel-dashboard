import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from "recharts";
import { initialFraudTrend } from "@/data/mockData";

export default function FraudTrendChart() {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Fraud Trend Analysis</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={initialFraudTrend}>
            <defs>
              <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis dataKey="time" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(222, 41%, 10%)",
                border: "1px solid hsl(222, 30%, 18%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 93%)",
              }}
            />
            <Area type="monotone" dataKey="total" stroke="hsl(187, 85%, 53%)" fill="url(#totalGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="frauds" stroke="hsl(0, 72%, 55%)" fill="url(#fraudGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
