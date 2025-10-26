import { Header } from "@/components/Header/Header";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { UpcomingEvents } from "@/components/Dashboard/UpcomingEvents";
import { SubjectsList } from "@/components/Dashboard/SubjectsList";
import { StudyAlerts } from "@/components/Dashboard/StudyAlerts";
import { StudyTimer } from "@/components/Timer/StudyTimer";
import { TrendingUp, BookOpen, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Study Timer */}
        <div className="mb-8 animate-fade-in">
          <StudyTimer />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <StatsCard
            title="Desempenho Geral"
            value="78%"
            icon={TrendingUp}
            trend="+5% esta semana"
            variant="primary"
          />
          <StatsCard
            title="Edital Estudado"
            value="42%"
            icon={BookOpen}
            trend="12 de 28 tópicos"
            variant="accent"
          />
          <StatsCard
            title="Horas Totais"
            value="124h"
            icon={Clock}
            trend="8h esta semana"
          />
        </div>

        {/* Study Alerts & Upcoming Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StudyAlerts />
          <UpcomingEvents />
        </div>

        {/* Subjects List */}
        <SubjectsList />
      </main>
    </div>
  );
};

export default Index;
