import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTransactions } from "@/context/TransactionContext";
import { formatCurrency } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  "Alimentación": "hsl(221, 83%, 53%)",
  "Transporte": "hsl(152, 69%, 40%)",
  "Entretenimiento": "hsl(38, 92%, 50%)",
  "Compras": "hsl(280, 65%, 60%)",
  "Servicios": "hsl(0, 72%, 63%)",
  "Café": "hsl(280, 65%, 60%)",
  "Salario": "hsl(152, 69%, 40%)",
  "Freelance": "hsl(38, 92%, 50%)",
};

const ExpenseChart = () => {
  const { transactions } = useTransactions();

  const categoryMap: Record<string, number> = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(categoryMap).map(name => ({ name, value: categoryMap[name], color: CATEGORY_COLORS[name] || "hsl(0, 72%, 63%)" }));
  const total = data.reduce((acc, item) => acc + item.value, 0) || 1;

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-lg font-semibold font-display mb-6">Gastos por Categoría</h2>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`$${value}`, ""]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                boxShadow: "var(--shadow-md)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium">{formatCurrency(item.value)}</span>
              <span className="text-muted-foreground text-xs w-12 text-right">
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;
