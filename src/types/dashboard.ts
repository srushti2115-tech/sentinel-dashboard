// Transaction and fraud data types

export interface Transaction {
  id: string;
  user: string;
  amount: number;
  location: string;
  device: string;
  riskScore: number;
  status: "Safe" | "Warning" | "Fraud";
  timestamp: Date;
}

export interface FraudHotspot {
  city: string;
  lat: number;
  lng: number;
  count: number;
  riskLevel: "high" | "medium" | "low";
}

export interface NetworkNode {
  id: string;
  label: string;
  type: "account" | "merchant";
  flagged: boolean;
}

export interface NetworkLink {
  source: string;
  target: string;
  amount: number;
  suspicious: boolean;
}

export interface Stats {
  totalTransactions: number;
  fraudDetected: number;
  riskScore: number;
  blockedTransactions: number;
}
