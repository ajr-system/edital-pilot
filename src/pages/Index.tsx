import { Header } from "@/components/Header/Header";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Calendar } from "@/components/Dashboard/Calendar";
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Calendar & Events */}
          <div className="lg:col-span-2 space-y-6">
            <Calendar />
            <StudyAlerts />
          </div>

          {/* Right Column - Timer & Events */}
          <div className="space-y-6">
            <StudyTimer />
            <UpcomingEvents />
          </div>
        </div>

        {/* Subjects List */}
        <SubjectsList />
      </main>
    </div>
  );
};

export default Index;
