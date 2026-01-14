import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import TransactionList from "@/components/dashboard/TransactionList";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import QuickActions from "@/components/dashboard/QuickActions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Balance Total"
            value="$12,450.80"
            subtitle="Todas las cuentas"
            icon={Wallet}
            variant="primary"
          />
          <StatCard
            title="Ingresos del Mes"
            value="$4,300.00"
            icon={TrendingUp}
            variant="success"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Gastos del Mes"
            value="$2,150.50"
            icon={TrendingDown}
            variant="expense"
            trend={{ value: 3.2, isPositive: false }}
          />
          <StatCard
            title="Meta de Ahorro"
            value="68%"
            subtitle="$6,800 de $10,000"
            icon={Target}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <MonthlyChart />
            <TransactionList />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <ExpenseChart />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
