import { Transaction } from "@/types/dashboard";
import { AlertTriangle, X } from "lucide-react";

interface FraudAlertPopupProps {
  alerts: Transaction[];
  onDismiss: (id: string) => void;
}

export default function FraudAlertPopup({ alerts, onDismiss }: FraudAlertPopupProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {alerts.map((alert) => (
        <div key={alert.id} className="fraud-alert-popup flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-destructive">Fraud Detected!</p>
            <p className="text-xs text-muted-foreground mt-1">
              {alert.id} · {alert.user} · ₹{alert.amount.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {alert.location} · Risk: {alert.riskScore}
            </p>
          </div>
          <button
            onClick={() => onDismiss(alert.id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
