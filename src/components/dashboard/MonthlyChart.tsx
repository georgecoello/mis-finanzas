import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactions } from "@/context/TransactionContext";
import { formatCurrency } from "@/lib/utils";

const MONTH_NAMES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

function monthKey(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}`;
}

const MonthlyChart = () => {
  const { transactions } = useTransactions();

  // Build last 6 months keys
  const now = new Date();
  const months: { key: string; label: string }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: MONTH_NAMES[d.getMonth()] });
  }

  const data = months.map(m => {
    const ingresos = transactions.filter(t => t.type === "income" && monthKey(t.date) === m.key).reduce((s, t) => s + t.amount, 0);
    const gastos = transactions.filter(t => t.type === "expense" && monthKey(t.date) === m.key).reduce((s, t) => s + t.amount, 0);
    return { month: m.label, ingresos, gastos };
  });

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <h2 className="text-lg font-semibold font-display mb-6">Resumen Mensual</h2>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 69%, 40%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(152, 69%, 40%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 63%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(0, 72%, 63%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), ""]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                boxShadow: "var(--shadow-md)",
              }}
            />
            <Area
              type="monotone"
              dataKey="ingresos"
              stroke="hsl(152, 69%, 40%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIngresos)"
              name="Ingresos"
            />
            <Area
              type="monotone"
              dataKey="gastos"
              stroke="hsl(0, 72%, 63%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGastos)"
              name="Gastos"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Ingresos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-expense" />
          <span className="text-sm text-muted-foreground">Gastos</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyChart;