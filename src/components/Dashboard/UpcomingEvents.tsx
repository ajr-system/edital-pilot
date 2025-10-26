import { Card } from "@/components/ui/card";
import { Calendar, Clock, AlertCircle } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "exam" | "revision" | "reminder";
}

export const UpcomingEvents = () => {
  // Mock data
  const events: Event[] = [
    { id: "1", title: "Prova Simulada", date: "15/01", time: "14:00", type: "exam" },
    { id: "2", title: "Revisão: Dir. Constitucional", date: "17/01", time: "09:00", type: "revision" },
    { id: "3", title: "Entrega de Trabalho", date: "20/01", time: "23:59", type: "reminder" },
  ];

  const typeConfig = {
    exam: { color: "text-danger", bg: "bg-danger-light", icon: AlertCircle },
    revision: { color: "text-info", bg: "bg-info-light", icon: Clock },
    reminder: { color: "text-warning", bg: "bg-warning-light", icon: Calendar },
  };

  return (
    <Card className="card-elevated p-6">
      <h3 className="text-lg font-bold mb-4">Próximos Eventos</h3>
      <div className="space-y-3">
        {events.map((event) => {
          const config = typeConfig[event.type];
          const Icon = config.icon;
          
          return (
            <div
              key={event.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-surface hover:bg-muted transition-smooth"
            >
              <div className={`p-2 rounded-lg ${config.bg}`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                <p className="text-xs text-foreground-secondary">
                  {event.date} às {event.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
