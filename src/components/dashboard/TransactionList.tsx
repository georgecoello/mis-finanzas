import { ArrowDownLeft, ArrowUpRight, Coffee, Home, ShoppingBag, Car, Utensils, Briefcase, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Alimentación": Utensils,
  "Transporte": Car,
  "Compras": ShoppingBag,
  "Hogar": Home,
  "Café": Coffee,
  "Salario": Briefcase,
  "Freelance": DollarSign,
};

const transactions: Transaction[] = [
  { id: "1", description: "Salario mensual", amount: 3500, type: "income", category: "Salario", date: "Hoy" },
  { id: "2", description: "Supermercado", amount: 125.50, type: "expense", category: "Alimentación", date: "Hoy" },
  { id: "3", description: "Gasolina", amount: 45.00, type: "expense", category: "Transporte", date: "Ayer" },
  { id: "4", description: "Proyecto freelance", amount: 800, type: "income", category: "Freelance", date: "Ayer" },
  { id: "5", description: "Café Starbucks", amount: 8.50, type: "expense", category: "Café", date: "2 días" },
  { id: "6", description: "Amazon", amount: 67.99, type: "expense", category: "Compras", date: "3 días" },
];

const TransactionList = () => {
  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-display">Transacciones Recientes</h2>
        <button className="text-sm text-primary hover:underline font-medium">
          Ver todas
        </button>
      </div>
      <div className="space-y-1">
        {transactions.map((transaction, index) => {
          const IconComponent = categoryIcons[transaction.category] || DollarSign;
          return (
            <div 
              key={transaction.id} 
              className="transaction-item animate-slide-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2.5 rounded-xl",
                  transaction.type === "income" 
                    ? "bg-success/10 text-success" 
                    : "bg-muted text-muted-foreground"
                )}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-semibold",
                  transaction.type === "income" ? "text-success" : "text-foreground"
                )}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </span>
                {transaction.type === "income" ? (
                  <ArrowDownLeft className="h-4 w-4 text-success" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;