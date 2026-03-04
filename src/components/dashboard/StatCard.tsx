import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "expense";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

import React from "react";
import { Pencil } from "lucide-react";
import StatEditModal from "@/components/dashboard/StatEditModal";
import { useTransactions } from "@/context/TransactionContext";

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = "default",
  trend 
}: StatCardProps) => {
  const variantStyles = {
    default: "bg-card text-card-foreground",
    primary: "stat-card-primary",
    success: "stat-card-success",
    expense: "stat-card-expense",
  };

  const iconBgStyles = {
    default: "bg-primary/10 text-primary",
    primary: "bg-white/20 text-white",
    success: "bg-white/20 text-white",
    expense: "bg-white/20 text-white",
  };

  const editButtonStyles = {
    default: "hover:bg-primary/10 text-primary",
    primary: "hover:bg-white/10 text-white",
    success: "hover:bg-white/10 text-white",
    expense: "hover:bg-white/10 text-white",
  };

  const [open, setOpen] = React.useState(false);
  const { setStat, stats } = useTransactions() as any;

  const statKeyMap: Record<string, any> = {
    "Ingresos del Mes": "ingresosMes",
  };

  const key = statKeyMap[title];

  function onConfirm(v: string) {
    if (!key) return;
    if (key === "ahorroMeta") setStat(key, v);
    else {
      const num = Number(v.toString().replace(/[^0-9.-]+/g, ""));
      if (!isNaN(num)) setStat(key, num);
    }
  }

  return (
    <div className={cn("stat-card animate-fade-in", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "text-white/80"
            )}>
              {title}
            </p>
            {key && (
              <button 
                className={cn(
                  "p-1.5 rounded-lg transition-colors duration-200",
                  editButtonStyles[variant]
                )} 
                aria-label={`Editar ${title}`} 
                onClick={() => setOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-2xl font-bold font-display">{value}</p>
          {subtitle && (
            <p className={cn(
              "text-xs",
              variant === "default" ? "text-muted-foreground" : "text-white/70"
            )}>
              {subtitle}
            </p>
          )}
          {trend && (
            <p className={cn(
              "text-xs font-medium flex items-center gap-1",
              trend.isPositive 
                ? variant === "default" ? "text-success" : "text-white/90"
                : variant === "default" ? "text-expense" : "text-white/90"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              <span className={variant === "default" ? "text-muted-foreground" : "text-white/70"}>
                vs mes anterior
              </span>
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          iconBgStyles[variant]
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {key && (
        <StatEditModal
          open={open}
          onOpenChange={(o) => setOpen(o)}
          title={title}
          currentValue={String((stats as any)?.[key] ?? value)}
          onConfirm={onConfirm}
          placeholder={key === "ahorroMeta" ? "68%" : "L. 0.00"}
        />
      )}
    </div>
  );
};

export default StatCard;
