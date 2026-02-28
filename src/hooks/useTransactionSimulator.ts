import { useState, useEffect, useCallback, useRef } from "react";
import { Transaction, Stats } from "@/types/dashboard";
import { generateTransaction } from "@/data/mockData";

export function useTransactionSimulator() {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    Array.from({ length: 10 }, () => generateTransaction())
  );
  const [stats, setStats] = useState<Stats>({
    totalTransactions: 14832,
    fraudDetected: 234,
    riskScore: 42,
    blockedTransactions: 189,
  });
  const [fraudAlerts, setFraudAlerts] = useState<Transaction[]>([]);
  const alertTimeout = useRef<NodeJS.Timeout>();

  const dismissAlert = useCallback((id: string) => {
    setFraudAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTx = generateTransaction();
      setTransactions((prev) => [newTx, ...prev.slice(0, 19)]);
      setStats((prev) => ({
        totalTransactions: prev.totalTransactions + 1,
        fraudDetected: prev.fraudDetected + (newTx.status === "Fraud" ? 1 : 0),
        riskScore: Math.max(10, Math.min(95, prev.riskScore + (newTx.status === "Fraud" ? 3 : -1))),
        blockedTransactions: prev.blockedTransactions + (newTx.status === "Fraud" ? 1 : 0),
      }));

      if (newTx.status === "Fraud") {
        setFraudAlerts((prev) => [newTx, ...prev.slice(0, 2)]);
        alertTimeout.current = setTimeout(() => dismissAlert(newTx.id), 4000);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      if (alertTimeout.current) clearTimeout(alertTimeout.current);
    };
  }, [dismissAlert]);

  return { transactions, stats, fraudAlerts, dismissAlert };
}
