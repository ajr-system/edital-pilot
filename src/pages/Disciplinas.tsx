import { Header } from "@/components/Header/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, BookOpen, Trash2, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Resumo {
  id: string;
  titulo: string;
  conteudo: string;
}

interface Topico {
  id: string;
  nome: string;
  resumos: Resumo[];
}

interface Disciplina {
  id: string;
  nome: string;
  peso: number;
  topicos: Topico[];
}

export default function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([
    {
      id: "1",
      nome: "Português",
      peso: 3,
      topicos: [
        {
          id: "1-1",
          nome: "Acentuação",
          resumos: [
            { id: "1-1-1", titulo: "Regras de acentuação", conteudo: "Conteúdo do resumo..." }
          ]
        }
      ]
    }
  ]);

  const [novaDisciplina, setNovaDisciplina] = useState("");
  const [novoPeso, setNovoPeso] = useState(3);
  const [novoTopico, setNovoTopico] = useState<{ [key: string]: string }>({});
  const [novoResumo, setNovoResumo] = useState<{ [key: string]: { titulo: string; conteudo: string } }>({});

  const adicionarDisciplina = () => {
    if (novaDisciplina.trim()) {
      const nova: Disciplina = {
        id: Date.now().toString(),
        nome: novaDisciplina,
        peso: novoPeso,
        topicos: []
      };
      setDisciplinas([...disciplinas, nova]);
      setNovaDisciplina("");
      setNovoPeso(3);
    }
  };

  const removerDisciplina = (id: string) => {
    setDisciplinas(disciplinas.filter(d => d.id !== id));
  };

  const adicionarTopico = (disciplinaId: string) => {
    const nomeTopico = novoTopico[disciplinaId];
    if (nomeTopico?.trim()) {
      setDisciplinas(disciplinas.map(d => {
        if (d.id === disciplinaId) {
          return {
            ...d,
            topicos: [...d.topicos, {
              id: `${d.id}-${Date.now()}`,
              nome: nomeTopico,
              resumos: []
            }]
          };
        }
        return d;
      }));
      setNovoTopico({ ...novoTopico, [disciplinaId]: "" });
    }
  };

  const removerTopico = (disciplinaId: string, topicoId: string) => {
    setDisciplinas(disciplinas.map(d => {
      if (d.id === disciplinaId) {
        return {
          ...d,
          topicos: d.topicos.filter(t => t.id !== topicoId)
        };
      }
      return d;
    }));
  };

  const adicionarResumo = (disciplinaId: string, topicoId: string) => {
    const resumoKey = `${disciplinaId}-${topicoId}`;
    const resumoData = novoResumo[resumoKey];
    if (resumoData?.titulo?.trim()) {
      setDisciplinas(disciplinas.map(d => {
        if (d.id === disciplinaId) {
          return {
            ...d,
            topicos: d.topicos.map(t => {
              if (t.id === topicoId) {
                return {
                  ...t,
                  resumos: [...t.resumos, {
                    id: `${t.id}-${Date.now()}`,
                    titulo: resumoData.titulo,
                    conteudo: resumoData.conteudo || ""
                  }]
                };
              }
              return t;
            })
          };
        }
        return d;
      }));
      setNovoResumo({ ...novoResumo, [resumoKey]: { titulo: "", conteudo: "" } });
    }
  };

  const removerResumo = (disciplinaId: string, topicoId: string, resumoId: string) => {
    setDisciplinas(disciplinas.map(d => {
      if (d.id === disciplinaId) {
        return {
          ...d,
          topicos: d.topicos.map(t => {
            if (t.id === topicoId) {
              return {
                ...t,
                resumos: t.resumos.filter(r => r.id !== resumoId)
              };
            }
            return t;
          })
        };
      }
      return d;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Minhas Disciplinas</h2>
          <p className="text-foreground-secondary">Organize suas disciplinas, tópicos e resumos</p>
        </div>

        {/* Adicionar Nova Disciplina */}
        <Card className="card-elevated p-6 mb-8">
          <h3 className="text-lg font-bold mb-4">Nova Disciplina</h3>
          <div className="flex gap-4">
            <Input
              placeholder="Nome da disciplina"
              value={novaDisciplina}
              onChange={(e) => setNovaDisciplina(e.target.value)}
              className="flex-1"
            />
            <Input
              type="number"
              min="1"
              max="5"
              placeholder="Peso (1-5)"
              value={novoPeso}
              onChange={(e) => setNovoPeso(Number(e.target.value))}
              className="w-32"
            />
            <Button onClick={adicionarDisciplina} className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar
            </Button>
          </div>
        </Card>

        {/* Lista de Disciplinas */}
        <div className="space-y-6">
          {disciplinas.map((disciplina) => (
            <Card key={disciplina.id} className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{disciplina.nome}</h3>
                    <p className="text-sm text-foreground-secondary">Peso: {disciplina.peso}/5</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removerDisciplina(disciplina.id)}
                  className="text-danger hover:bg-danger-light"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Adicionar Tópico */}
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Novo tópico (ex: Acentuação)"
                  value={novoTopico[disciplina.id] || ""}
                  onChange={(e) => setNovoTopico({ ...novoTopico, [disciplina.id]: e.target.value })}
                  className="flex-1"
                />
                <Button
                  onClick={() => adicionarTopico(disciplina.id)}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tópico
                </Button>
              </div>

              {/* Accordion de Tópicos */}
              <Accordion type="single" collapsible className="w-full">
                {disciplina.topicos.map((topico) => (
                  <AccordionItem key={topico.id} value={topico.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        <span className="font-semibold">{topico.nome}</span>
                        <span className="text-xs text-foreground-secondary ml-2">
                          ({topico.resumos.length} resumos)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-6 space-y-4">
                        {/* Adicionar Resumo */}
                        <div className="space-y-2">
                          <Input
                            placeholder="Título do resumo"
                            value={novoResumo[`${disciplina.id}-${topico.id}`]?.titulo || ""}
                            onChange={(e) => setNovoResumo({
                              ...novoResumo,
                              [`${disciplina.id}-${topico.id}`]: {
                                ...novoResumo[`${disciplina.id}-${topico.id}`],
                                titulo: e.target.value
                              }
                            })}
                            className="w-full"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => adicionarResumo(disciplina.id, topico.id)}
                              size="sm"
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Adicionar Resumo
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removerTopico(disciplina.id, topico.id)}
                              className="text-danger hover:bg-danger-light"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remover Tópico
                            </Button>
                          </div>
                        </div>

                        {/* Lista de Resumos */}
                        <div className="space-y-2">
                          {topico.resumos.map((resumo) => (
                            <div
                              key={resumo.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-surface hover:bg-muted transition-smooth"
                            >
                              <span className="text-sm font-medium">{resumo.titulo}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removerResumo(disciplina.id, topico.id, resumo.id)}
                                className="text-danger hover:bg-danger-light"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {disciplina.topicos.length === 0 && (
                <p className="text-sm text-foreground-secondary text-center py-4">
                  Nenhum tópico adicionado ainda
                </p>
              )}
            </Card>
          ))}
        </div>

        {disciplinas.length === 0 && (
          <Card className="card-elevated p-12 text-center">
            <BookOpen className="w-12 h-12 text-foreground-secondary mx-auto mb-4" />
            <p className="text-foreground-secondary">
              Nenhuma disciplina cadastrada. Adicione sua primeira disciplina acima!
            </p>
          </Card>
        )}
      </main>
    </div>
  );
}
