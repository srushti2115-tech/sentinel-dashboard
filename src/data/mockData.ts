import { Transaction, FraudHotspot, NetworkNode, NetworkLink } from "@/types/dashboard";

const users = ["Rahul S.", "Priya M.", "Amit K.", "Sneha R.", "Vikram P.", "Anjali D.", "Karan T.", "Meera L.", "Rohan G.", "Divya N."];
const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];
const devices = ["iPhone 15", "Samsung S24", "OnePlus 12", "Pixel 8", "Xiaomi 14", "iPad Pro", "Unknown Device"];

let txCounter = 1000;

export function generateTransaction(): Transaction {
  txCounter++;
  const riskScore = Math.random() < 0.15
    ? Math.floor(Math.random() * 20 + 80)
    : Math.random() < 0.3
      ? Math.floor(Math.random() * 30 + 50)
      : Math.floor(Math.random() * 50);

  const status: Transaction["status"] =
    riskScore > 80 ? "Fraud" : riskScore > 50 ? "Warning" : "Safe";

  const amount = riskScore > 80
    ? Math.floor(Math.random() * 90000 + 10000)
    : Math.floor(Math.random() * 5000 + 100);

  return {
    id: `TXN${txCounter}`,
    user: users[Math.floor(Math.random() * users.length)],
    amount,
    location: locations[Math.floor(Math.random() * locations.length)],
    device: riskScore > 70 ? "Unknown Device" : devices[Math.floor(Math.random() * devices.length)],
    riskScore,
    status,
    timestamp: new Date(),
  };
}

export const fraudHotspots: FraudHotspot[] = [
  { city: "Mumbai", lat: 19.076, lng: 72.8777, count: 142, riskLevel: "high" },
  { city: "Delhi", lat: 28.6139, lng: 77.209, count: 98, riskLevel: "high" },
  { city: "Bangalore", lat: 12.9716, lng: 77.5946, count: 67, riskLevel: "medium" },
  { city: "Chennai", lat: 13.0827, lng: 80.2707, count: 45, riskLevel: "medium" },
  { city: "Kolkata", lat: 22.5726, lng: 88.3639, count: 78, riskLevel: "high" },
  { city: "Hyderabad", lat: 17.385, lng: 78.4867, count: 34, riskLevel: "low" },
  { city: "Pune", lat: 18.5204, lng: 73.8567, count: 56, riskLevel: "medium" },
  { city: "Ahmedabad", lat: 23.0225, lng: 72.5714, count: 23, riskLevel: "low" },
  { city: "Jaipur", lat: 26.9124, lng: 75.7873, count: 41, riskLevel: "medium" },
  { city: "Lucknow", lat: 26.8467, lng: 80.9462, count: 19, riskLevel: "low" },
];

export const networkNodes: NetworkNode[] = [
  { id: "A1", label: "Rahul S.", type: "account", flagged: true },
  { id: "A2", label: "Priya M.", type: "account", flagged: false },
  { id: "A3", label: "Amit K.", type: "account", flagged: true },
  { id: "A4", label: "Sneha R.", type: "account", flagged: false },
  { id: "A5", label: "Vikram P.", type: "account", flagged: true },
  { id: "M1", label: "Shop XYZ", type: "merchant", flagged: true },
  { id: "M2", label: "Store ABC", type: "merchant", flagged: false },
  { id: "A6", label: "Karan T.", type: "account", flagged: false },
  { id: "A7", label: "Ghost Acc", type: "account", flagged: true },
];

export const networkLinks: NetworkLink[] = [
  { source: "A1", target: "M1", amount: 45000, suspicious: true },
  { source: "A3", target: "M1", amount: 62000, suspicious: true },
  { source: "A5", target: "M1", amount: 38000, suspicious: true },
  { source: "A2", target: "M2", amount: 2500, suspicious: false },
  { source: "A4", target: "M2", amount: 1800, suspicious: false },
  { source: "A1", target: "A7", amount: 55000, suspicious: true },
  { source: "A7", target: "A3", amount: 48000, suspicious: true },
  { source: "A5", target: "A7", amount: 71000, suspicious: true },
  { source: "A6", target: "M2", amount: 3200, suspicious: false },
];

export const initialFraudTrend = [
  { time: "00:00", frauds: 12, total: 340 },
  { time: "04:00", frauds: 5, total: 120 },
  { time: "08:00", frauds: 18, total: 580 },
  { time: "12:00", frauds: 24, total: 890 },
  { time: "16:00", frauds: 31, total: 1020 },
  { time: "20:00", frauds: 28, total: 760 },
  { time: "Now", frauds: 15, total: 430 },
];

export const aiExplanations = [
  { icon: "📍", reason: "Unusual Location", detail: "Transaction initiated from a city not in user's history" },
  { icon: "💰", reason: "High Transaction Amount", detail: "Amount exceeds 3x the user's average spending pattern" },
  { icon: "📱", reason: "New Device Detected", detail: "Transaction from unregistered device with no prior history" },
  { icon: "⏰", reason: "Odd Transaction Time", detail: "Activity detected during unusual hours (2AM - 5AM)" },
  { icon: "🔄", reason: "Rapid Successive Transfers", detail: "Multiple transactions within 60 seconds to different accounts" },
  { icon: "🌐", reason: "VPN/Proxy Detected", detail: "Connection routed through anonymizing proxy service" },
];

export const userBehavior = {
  avgSpend: "₹2,450",
  mostUsedLocation: "Mumbai",
  preferredDevice: "iPhone 15",
  dailyTransactions: 8,
  riskTrend: "Stable",
  lastLogin: "2 min ago",
};
