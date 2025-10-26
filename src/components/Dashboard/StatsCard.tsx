import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "primary" | "accent";
}

export const StatsCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatsCardProps) => {
  const variantStyles = {
    default: "bg-card",
    primary: "bg-gradient-primary text-primary-foreground",
    accent: "bg-gradient-accent text-accent-foreground",
  };

  return (
    <Card className={`card-elevated p-6 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium mb-2 ${variant === "default" ? "text-foreground-secondary" : "opacity-90"}`}>
            {title}
          </p>
          <h3 className="text-3xl font-bold mb-1">{value}</h3>
          {trend && (
            <p className={`text-xs ${variant === "default" ? "text-foreground-secondary" : "opacity-80"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${variant === "default" ? "bg-primary/10" : "bg-white/20"}`}>
          <Icon className={`w-6 h-6 ${variant === "default" ? "text-primary" : "text-current"}`} />
        </div>
      </div>
    </Card>
  );
};
