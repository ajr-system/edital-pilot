import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Subject {
  id: string;
  name: string;
  hours: number;
  progress: number;
  weight: number;
}

export const SubjectsList = () => {
  // Mock data
  const subjects: Subject[] = [
    { id: "1", name: "Direito Constitucional", hours: 24.5, progress: 65, weight: 5 },
    { id: "2", name: "Direito Administrativo", hours: 18.2, progress: 45, weight: 4 },
    { id: "3", name: "Português", hours: 15.8, progress: 52, weight: 3 },
    { id: "4", name: "Raciocínio Lógico", hours: 12.3, progress: 38, weight: 4 },
  ];

  return (
    <Card className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Minhas Disciplinas</h3>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Disciplina
        </Button>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="p-4 rounded-lg bg-surface hover:bg-muted transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{subject.name}</h4>
                  <div className="flex items-center gap-4 text-xs text-foreground-secondary">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{subject.hours}h estudadas</span>
                    </div>
                    <span>Peso: {subject.weight}/5</span>
                  </div>
                </div>
              </div>
              <span className="text-sm font-bold text-primary">{subject.progress}%</span>
            </div>
            
            <Progress value={subject.progress} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
};
