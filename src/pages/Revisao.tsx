import { useState } from "react";
import { Header } from "@/components/Header/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, BookOpen, Sparkles, RotateCw } from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
}

const Revisao = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Mock data
  const subjects = ["Direito Constitucional", "Direito Administrativo", "Português", "Raciocínio Lógico"];
  
  const flashcards: Flashcard[] = [
    {
      id: "1",
      subject: "Direito Constitucional",
      question: "Qual é o princípio fundamental que garante a igualdade de todos perante a lei?",
      answer: "Princípio da Isonomia ou Igualdade, previsto no artigo 5º da Constituição Federal.",
    },
    {
      id: "2",
      subject: "Direito Constitucional",
      question: "O que são direitos fundamentais de primeira geração?",
      answer: "São os direitos civis e políticos, relacionados à liberdade individual e limitação do poder estatal.",
    },
  ];

  const currentCard = flashcards[currentCardIndex];

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Sistema de Revisão</h1>
          <p className="text-foreground-secondary">Revise seus conteúdos com flashcards inteligentes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Add Topic */}
          <div className="space-y-6">
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-bold mb-4">Adicionar Tópico</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Disciplina</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tópico / Pergunta</label>
                  <Input placeholder="Ex: Princípios do Direito Administrativo" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Resumo / Resposta</label>
                  <Textarea 
                    placeholder="Escreva um resumo ou a resposta..."
                    rows={4}
                  />
                </div>

                <Button className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Adicionar Card
                </Button>
              </div>
            </Card>

            <Card className="card-elevated p-6">
              <h3 className="text-lg font-bold mb-4">Importar Baralho</h3>
              <p className="text-sm text-foreground-secondary mb-4">
                Importe cards gerados pelo ChatGPT ou arquivos .apkg do Anki
              </p>
              <Button variant="outline" className="w-full gap-2">
                <Sparkles className="w-4 h-4" />
                Importar Arquivo
              </Button>
            </Card>
          </div>

          {/* Right Panel - Flashcard Display */}
          <div className="lg:col-span-2">
            <Card className="card-elevated p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Modo de Estudo</h3>
                    <p className="text-sm text-foreground-secondary">
                      Card {currentCardIndex + 1} de {flashcards.length}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <RotateCw className="w-4 h-4" />
                  Embaralhar
                </Button>
              </div>

              {/* Flashcard */}
              <div className="perspective-1000">
                <div 
                  className={`
                    relative min-h-[400px] rounded-xl p-8 cursor-pointer
                    transition-all duration-500 transform-gpu
                    ${showAnswer ? "rotate-y-180" : ""}
                  `}
                  onClick={() => setShowAnswer(!showAnswer)}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front of Card */}
                  <div 
                    className={`
                      absolute inset-0 rounded-xl p-8 bg-gradient-primary
                      flex items-center justify-center text-center
                      backface-hidden
                      ${showAnswer ? "opacity-0" : "opacity-100"}
                    `}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="text-white">
                      <div className="text-sm font-medium mb-4 opacity-90">
                        {currentCard?.subject}
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        {currentCard?.question}
                      </h2>
                      <p className="text-sm opacity-80">Clique para ver a resposta</p>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div 
                    className={`
                      absolute inset-0 rounded-xl p-8 bg-gradient-accent
                      flex items-center justify-center text-center
                      backface-hidden rotate-y-180
                      ${showAnswer ? "opacity-100" : "opacity-0"}
                    `}
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="text-accent-foreground">
                      <div className="text-sm font-medium mb-4 opacity-90">
                        Resposta
                      </div>
                      <p className="text-lg leading-relaxed">
                        {currentCard?.answer}
                      </p>
                      <p className="text-sm opacity-80 mt-4">Clique para voltar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4 mt-6">
                <Button 
                  onClick={handleNextCard}
                  className="flex-1"
                  size="lg"
                >
                  Próximo Card
                </Button>
              </div>
            </Card>

            {/* Study Tips */}
            <Card className="card-elevated p-6 mt-6">
              <h3 className="text-sm font-bold mb-3">💡 Dicas de Revisão</h3>
              <ul className="text-sm text-foreground-secondary space-y-2">
                <li>• Revise o conteúdo em 1, 7, 15 e 30 dias para fixação ideal</li>
                <li>• Pratique a recuperação ativa tentando responder antes de ver</li>
                <li>• Crie conexões entre diferentes tópicos para melhor memorização</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Revisao;
