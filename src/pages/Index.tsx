import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import FraudTrendChart from "@/components/dashboard/FraudTrendChart";
import RiskScoreGauge from "@/components/dashboard/RiskScoreGauge";
import FraudMap from "@/components/dashboard/FraudMap";
import NetworkGraph from "@/components/dashboard/NetworkGraph";
import AIExplanation from "@/components/dashboard/AIExplanation";
import UserBehavior from "@/components/dashboard/UserBehavior";
import LiveTransactions from "@/components/dashboard/LiveTransactions";
import FraudAlertPopup from "@/components/dashboard/FraudAlertPopup";
import { useTransactionSimulator } from "@/hooks/useTransactionSimulator";

const Index = () => {
  const { transactions, stats, fraudAlerts, dismissAlert } = useTransactionSimulator();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <FraudAlertPopup alerts={fraudAlerts} onDismiss={dismissAlert} />

      <main className="ml-60 p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold gradient-text">
            Behavior-Aware UPI Fraud Detection System
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time AI-powered fraud monitoring and behavioral analysis
          </p>
        </div>

        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <FraudTrendChart />
          </div>
          <RiskScoreGauge score={stats.riskScore} />
        </div>

        {/* Map + Network */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FraudMap />
          <NetworkGraph />
        </div>

        {/* AI + Behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AIExplanation />
          <UserBehavior />
        </div>

        {/* Live Table */}
        <LiveTransactions transactions={transactions} />
      </main>
    </div>
  );
};

export default Index;
