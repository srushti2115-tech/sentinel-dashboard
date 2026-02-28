import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Brain,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Activity, label: "Live Transactions" },
  { icon: AlertTriangle, label: "Fraud Alerts" },
  { icon: Brain, label: "Behavior Analysis" },
  { icon: BarChart3, label: "Model Insights" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col border-r border-border bg-sidebar z-40">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <Shield className="w-7 h-7 text-primary" />
        <span className="text-lg font-bold gradient-text">FraudGuard</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`sidebar-link w-full ${item.active ? "active" : ""}`}
          >
            <item.icon className="w-4.5 h-4.5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-border">
        <div className="glass-card p-3 text-center">
          <p className="text-xs text-muted-foreground">System Status</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="pulse-dot bg-success" />
            <span className="text-sm font-medium text-success">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
