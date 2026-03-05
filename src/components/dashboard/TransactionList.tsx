import { ArrowDownLeft, ArrowUpRight, Coffee, Home, ShoppingBag, Car, Utensils, Briefcase, DollarSign, Trash2, Pill, Smartphone, CreditCard } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/context/TransactionContext";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Alimentación": Utensils,
  "Transporte": Car,
  "Compras": ShoppingBag,
  "Hogar": Home,
  "Café": Coffee,
  "Salario": Briefcase,
  "Freelance": DollarSign,
  "Farmacia": Pill,
  "Rancho": DollarSign,
  "Recargas": Smartphone,
  "Tarjeta": CreditCard,
};

const TransactionList = () => {
  const { transactions, removeTransaction, searchTerm } = useTransactions();

  const s = searchTerm.trim().toLowerCase();
  const filtered = transactions.filter(t => {
    if (!s) return true;
    return (
      t.description.toLowerCase().includes(s) ||
      t.category.toLowerCase().includes(s) ||
      new Date(t.date).toLocaleDateString().toLowerCase().includes(s) ||
      String(t.amount).includes(s)
    );
  });

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-display">Transacciones Recientes</h2>
        <button className="text-sm text-primary hover:underline font-medium">
          Ver todas
        </button>
      </div>
      <div className="space-y-1">
        {filtered.map((transaction, index) => {
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
                  <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-semibold",
                  transaction.type === "income" ? "text-success" : "text-foreground"
                )}>
                  {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                </span>
                {transaction.type === "income" ? (
                  <ArrowDownLeft className="h-4 w-4 text-success" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                )}
                <button
                  onClick={() => removeTransaction(transaction.id)}
                  className="ml-2 p-1 rounded-md hover:bg-muted"
                  aria-label={`Eliminar ${transaction.description}`}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;