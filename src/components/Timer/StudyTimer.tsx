import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Minimize2 } from "lucide-react";

export const StudyTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showBreakAlert, setShowBreakAlert] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = prev + 1;
          // Alerta aos 40 minutos (2400 segundos)
          if (newSeconds === 2400) {
            setShowBreakAlert(true);
            setTimeout(() => setShowBreakAlert(false), 5000);
          }
          return newSeconds;
        });
      }, 1000);
    } else if (!isRunning && seconds !== 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
        <Card className="p-4 shadow-xl bg-gradient-primary text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold font-mono">{formatTime(seconds)}</div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setIsRunning(!isRunning)}
                className="h-8 w-8"
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setIsMinimized(false)}
                className="h-8 w-8"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card className="card-elevated p-6 relative overflow-hidden">
      {showBreakAlert && (
        <div className="absolute inset-0 bg-warning/90 flex items-center justify-center z-10 animate-fade-in">
          <div className="text-center text-white p-6">
            <h3 className="text-2xl font-bold mb-2">⏰ Hora do Descanso!</h3>
            <p className="text-lg">Você estudou por 40 minutos. Faça uma pausa! 🎉</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Cronômetro de Estudo</h3>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsMinimized(true)}
          className="h-8 w-8"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mb-6">
        <div className="text-6xl font-bold font-mono mb-2 text-gradient-primary">
          {formatTime(seconds)}
        </div>
        <p className="text-sm text-foreground-secondary">
          {isRunning ? "Em andamento..." : "Pronto para começar"}
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          className="flex-1 gap-2"
          size="lg"
        >
          {isRunning ? (
            <>
              <Pause className="h-5 w-5" />
              Pausar
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Iniciar
            </>
          )}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <RotateCcw className="h-5 w-5" />
          Resetar
        </Button>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-info-light">
        <p className="text-xs text-info text-center">
          💡 A cada 40 minutos você receberá um aviso para descansar
        </p>
      </div>
    </Card>
  );
};
