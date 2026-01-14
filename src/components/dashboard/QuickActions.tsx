import { ArrowUpRight, ArrowDownLeft, RefreshCw, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { icon: ArrowUpRight, label: "Enviar", color: "bg-primary/10 text-primary hover:bg-primary/20" },
  { icon: ArrowDownLeft, label: "Recibir", color: "bg-success/10 text-success hover:bg-success/20" },
  { icon: RefreshCw, label: "Transferir", color: "bg-warning/10 text-warning hover:bg-warning/20" },
  { icon: PiggyBank, label: "Ahorrar", color: "bg-chart-4/10 text-chart-4 hover:bg-chart-4/20" },
];

const QuickActions = () => {
  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
      <h2 className="text-lg font-semibold font-display mb-4">Acciones Rápidas</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200",
              action.color
            )}
          >
            <action.icon className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;