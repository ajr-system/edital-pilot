import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CalendarDay {
  date: number;
  studied: boolean;
  hours: number;
}

export const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // Mock data - em produção viria do backend
  const daysInMonth = Array.from({ length: 31 }, (_, i) => ({
    date: i + 1,
    studied: Math.random() > 0.5,
    hours: Math.random() > 0.5 ? Math.random() * 3 : 0,
  }));

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const handleSaveEvent = () => {
    // Salvar evento no backend
    console.log("Event saved:", { day: selectedDay, eventTitle, eventDescription });
    setSelectedDay(null);
    setEventTitle("");
    setEventDescription("");
  };

  return (
    <>
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Calendário de Estudos</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-3">Janeiro 2025</span>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-foreground-secondary p-2">
              {day}
            </div>
          ))}
          
          {daysInMonth.map((day) => {
            const isStudied = day.hours >= 0.66; // 40 minutos
            return (
              <button
                key={day.date}
                onClick={() => handleDayClick(day.date)}
                className={`
                  aspect-square rounded-lg p-2 text-sm font-medium transition-all
                  ${isStudied 
                    ? "bg-success text-white hover:bg-success/90" 
                    : "bg-danger/10 text-danger hover:bg-danger/20"
                  }
                  hover:scale-105 hover:shadow-md
                `}
              >
                {day.date}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success"></div>
            <span className="text-foreground-secondary">Estudado (+40min)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-danger/30"></div>
            <span className="text-foreground-secondary">Sem estudo</span>
          </div>
        </div>
      </Card>

      <Dialog open={selectedDay !== null} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Evento - Dia {selectedDay}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título do Evento</label>
              <Input
                placeholder="Ex: Prova de Direito Constitucional"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição / Lembrete</label>
              <Textarea
                placeholder="Adicione detalhes ou lembretes..."
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                rows={4}
              />
            </div>
            <Button onClick={handleSaveEvent} className="w-full">
              Salvar Evento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
