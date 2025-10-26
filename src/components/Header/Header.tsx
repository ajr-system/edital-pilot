import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, Calendar, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient-primary">EstudaConcurso</h1>
            <p className="text-xs text-foreground-secondary">Seu assistente de estudos</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            size="sm"
            asChild
            className="gap-2"
          >
            <Link to="/">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            variant={isActive("/revisao") ? "default" : "ghost"}
            size="sm"
            asChild
            className="gap-2"
          >
            <Link to="/revisao">
              <BookOpen className="w-4 h-4" />
              Revisão
            </Link>
          </Button>
          <Button
            variant={isActive("/calendario") ? "default" : "ghost"}
            size="sm"
            asChild
            className="gap-2"
          >
            <Link to="/calendario">
              <Calendar className="w-4 h-4" />
              Calendário
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
