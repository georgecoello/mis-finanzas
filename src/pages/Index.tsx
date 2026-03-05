import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import TransactionList from "@/components/dashboard/TransactionList";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import AddTransactionForm from "@/components/dashboard/AddTransactionForm";
import { TransactionProvider, useTransactions } from "@/context/TransactionContext";
import { formatCurrency } from "@/lib/utils";

const Inner = () => {
  const { transactions, stats } = useTransactions();

  const computedBalance = transactions.reduce((s, t) => s + (t.type === "income" ? t.amount : -t.amount), 0);
  const now = new Date();
  const computedIngresosMes = transactions.filter(t => t.type === "income" && new Date(t.date).getMonth() === now.getMonth() && new Date(t.date).getFullYear() === now.getFullYear()).reduce((s, t) => s + t.amount, 0);
  const computedGastosMes = transactions.filter(t => t.type === "expense" && new Date(t.date).getMonth() === now.getMonth() && new Date(t.date).getFullYear() === now.getFullYear()).reduce((s, t) => s + t.amount, 0);

  const balance = stats?.balance ?? computedBalance;
  const ingresosMes = stats?.ingresosMes ?? computedIngresosMes;
  const gastosMes = stats?.gastosMes ?? computedGastosMes;
  
  // Calcular ahorro
  const ahorroMontoMes = ingresosMes - gastosMes;
  const ahorroPercentaje = ingresosMes > 0 ? ((ahorroMontoMes / ingresosMes) * 100).toFixed(1) : 0;

  const fmt = (v: number) => formatCurrency(v);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Ingresos del Mes"
            value={fmt(ingresosMes)}
            icon={TrendingUp}
            variant="success"
            trend={{ value: Number(((ingresosMes / (gastosMes || 1)) * 100).toFixed(1)), isPositive: ingresosMes >= gastosMes }}
          />
          <StatCard
            title="Gastos del Mes"
            value={fmt(gastosMes)}
            icon={TrendingDown}
            variant="expense"
            trend={{ value: Number(((gastosMes / (ingresosMes || 1)) * 100).toFixed(1)), isPositive: gastosMes <= ingresosMes }}
          />
          <StatCard
            title="Meta de Ahorro"
            value={`${ahorroPercentaje}%`}
            subtitle={`${fmt(ahorroMontoMes)} disponible`}
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
            <AddTransactionForm />
            <ExpenseChart />
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <TransactionProvider>
      <Inner />
    </TransactionProvider>
  );
};

export default Index;
