import { aiExplanations } from "@/data/mockData";

export default function AIExplanation() {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">AI Fraud Explanations</h3>
      <div className="space-y-3">
        {aiExplanations.map((item) => (
          <div
            key={item.reason}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <span className="text-lg mt-0.5">{item.icon}</span>
            <div>
              <p className="text-sm font-medium text-foreground">{item.reason}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
