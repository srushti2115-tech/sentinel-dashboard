import { Transaction } from "@/types/dashboard";

interface LiveTransactionsProps {
  transactions: Transaction[];
}

export default function LiveTransactions({ transactions }: LiveTransactionsProps) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Live Transactions</h3>
        <span className="flex items-center gap-1.5 text-xs text-success">
          <span className="pulse-dot bg-success" />
          Updating live
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs">
              <th className="text-left py-2 px-3 font-medium">ID</th>
              <th className="text-left py-2 px-3 font-medium">User</th>
              <th className="text-right py-2 px-3 font-medium">Amount</th>
              <th className="text-left py-2 px-3 font-medium">Location</th>
              <th className="text-left py-2 px-3 font-medium">Device</th>
              <th className="text-right py-2 px-3 font-medium">Risk</th>
              <th className="text-left py-2 px-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className={`border-b border-border/50 transition-colors hover:bg-secondary/30 ${
                  tx.status === "Fraud" ? "table-row-fraud" : ""
                }`}
              >
                <td className="py-2.5 px-3 font-mono text-xs text-muted-foreground">{tx.id}</td>
                <td className="py-2.5 px-3">{tx.user}</td>
                <td className="py-2.5 px-3 text-right font-mono">₹{tx.amount.toLocaleString()}</td>
                <td className="py-2.5 px-3">{tx.location}</td>
                <td className="py-2.5 px-3 text-xs">{tx.device}</td>
                <td className="py-2.5 px-3 text-right">
                  <span
                    className={`font-mono font-semibold ${
                      tx.riskScore > 80
                        ? "text-destructive"
                        : tx.riskScore > 50
                          ? "text-warning"
                          : "text-success"
                    }`}
                  >
                    {tx.riskScore}
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      tx.status === "Fraud"
                        ? "bg-destructive/15 status-fraud"
                        : tx.status === "Warning"
                          ? "bg-warning/15 status-warning"
                          : "bg-success/15 status-safe"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
