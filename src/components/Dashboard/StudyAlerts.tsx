import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, BookOpen } from "lucide-react";

interface Alert {
  id: string;
  type: "new" | "revision" | "exercise";
  subject: string;
  message: string;
}

export const StudyAlerts = () => {
  // Mock data
  const alerts: Alert[] = [
    { id: "1", type: "new", subject: "Dir. Constitucional", message: "Nova aula: Direitos Fundamentais" },
    { id: "2", type: "revision", subject: "Português", message: "Revisão agendada: Sintaxe" },
    { id: "3", type: "exercise", subject: "Raciocínio Lógico", message: "50 questões pendentes" },
  ];

  const typeConfig = {
    new: { 
      icon: BookOpen, 
      color: "text-info", 
      bg: "bg-info-light",
      label: "Nova Matéria" 
    },
    revision: { 
      icon: Clock, 
      color: "text-warning", 
      bg: "bg-warning-light",
      label: "Revisão" 
    },
    exercise: { 
      icon: CheckCircle, 
      color: "text-success", 
      bg: "bg-success-light",
      label: "Exercícios" 
    },
  };

  return (
    <Card className="card-elevated p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold">O que estudar hoje</h3>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = typeConfig[alert.type];
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth cursor-pointer"
            >
              <div className={`p-2 rounded-lg ${config.bg} shrink-0`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${config.color}`}>
                    {config.label}
                  </span>
                  <span className="text-xs text-foreground-secondary">•</span>
                  <span className="text-xs font-medium text-foreground-secondary">
                    {alert.subject}
                  </span>
                </div>
                <p className="text-sm text-foreground">{alert.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
