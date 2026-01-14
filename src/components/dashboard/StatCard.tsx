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

  return (
    <div className={cn("stat-card animate-fade-in", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn(
            "text-sm font-medium",
            variant === "default" ? "text-muted-foreground" : "text-white/80"
          )}>
            {title}
          </p>
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
    </div>
  );
};

export default StatCard;
