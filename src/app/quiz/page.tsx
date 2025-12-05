"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/logo";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Que signifie NIRD ?",
    options: [
      "Institut National de Recherche et Développement",
      "Intelligence Réseau et Distribution de Ressources",
      "Interface Neuronale pour la Découverte de Ressources",
      "Nouvelle Initiative pour le Développement Régional",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Quelle est la mission principale de NIRD ?",
    options: [
      "Fournir des services de divertissement",
      "Faire progresser les initiatives de recherche et développement",
      "Vendre des produits de consommation",
      "Gérer des plateformes de médias sociaux",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Sur quel secteur NIRD se concentre-t-il principalement ?",
    options: [
      "Commerce et Vente au Détail",
      "Divertissement et Médias",
      "Recherche et Innovation",
      "Transport et Logistique",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question:
      "Quelle approche NIRD utilise-t-il pour résoudre les problèmes complexes ?",
    options: [
      "Méthodes traditionnelles uniquement",
      "Approches innovantes et collaboratives",
      "Recherche isolée et individuelle",
      "Gestion descendante",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Comment NIRD contribue-t-il à la communauté ?",
    options: [
      "Par le financement uniquement",
      "En réalisant des expériences isolées",
      "Par le partage des connaissances et la collaboration",
      "En restreignant l'accès à la recherche",
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "Quelle est l'une des valeurs fondamentales de NIRD ?",
    options: [
      "Maximisation des profits",
      "Compétition plutôt que collaboration",
      "Innovation et excellence",
      "Secret et exclusivité",
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "Comment NIRD soutient-il les chercheurs ?",
    options: [
      "Par l'infrastructure et les ressources",
      "En fournissant du divertissement",
      "Par la présence sur les réseaux sociaux",
      "En limitant l'accès aux outils",
    ],
    correctAnswer: 0,
  },
  {
    id: 8,
    question: "Quel type de projets NIRD entreprend-il généralement ?",
    options: [
      "Projets commerciaux à court terme",
      "Initiatives de recherche et développement à long terme",
      "Campagnes marketing",
      "Développement immobilier",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Comment NIRD mesure-t-il le succès ?",
    options: [
      "Par le nombre d'abonnés sur les réseaux sociaux",
      "Par l'impact sur la recherche et l'innovation",
      "Par la performance boursière",
      "Par les revenus publicitaires",
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Qu'est-ce qui rend NIRD unique dans son domaine ?",
    options: [
      "Les prix les plus bas",
      "La plus grande infrastructure physique",
      "L'engagement envers l'innovation collaborative",
      "Les délais de livraison les plus rapides",
    ],
    correctAnswer: 2,
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!showScore && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showScore) {
      handleNextQuestion();
    }
  }, [timeLeft, showScore]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answerIndex;
      setAnswers(newAnswers);

      if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setAnswers(new Array(quizQuestions.length).fill(null));
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const timeProgress = (timeLeft / 30) * 100;

  if (showScore) {
    const percentage = (score / quizQuestions.length) * 100;
    let message = "";
    let icon = "";

    if (percentage >= 90) {
      message = "Exceptionnel ! Vous êtes un expert NIRD !";
      icon = "emoji_events";
    } else if (percentage >= 70) {
      message = "Excellent travail ! Vous connaissez bien NIRD !";
      icon = "celebration";
    } else if (percentage >= 50) {
      message = "Bon effort ! Continuez à apprendre sur NIRD !";
      icon = "thumb_up";
    } else {
      message =
        "Continuez à explorer ! Il y a encore plus à apprendre sur NIRD !";
      icon = "menu_book";
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl animate-[scale-in_0.5s_ease-out]">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center">
            <span className="symbols filled text-primary text-8xl mb-6 block animate-[bounce_1s_ease-in-out]">
              {icon}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Quiz Terminé !
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {message}
            </p>

            <div className="bg-primary/10 border-2 border-primary rounded-2xl p-8 mb-8">
              <div className="text-foreground">
                <p className="text-lg mb-2 text-muted-foreground">
                  Votre Score
                </p>
                <p className="text-6xl font-bold mb-2 text-primary">
                  {score}/{quizQuestions.length}
                </p>
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden border border-border">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-2xl mt-3 font-semibold text-primary">
                  {percentage.toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={restartQuiz}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="symbols text-xl">refresh</span>
                Réessayer
              </button>

              <Link href="/">
                <button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <span className="symbols text-xl">home</span>
                  Retour à l'Accueil
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8 mt-4">
        <Logo className="h-8 w-auto" />
      </div>

      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-foreground">
              Question {currentQuestion + 1} sur {quizQuestions.length}
            </span>
            <span className="text-sm font-semibold text-foreground flex items-center gap-1">
              <span className="symbols text-base">star</span>
              Score : {score}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden border border-border">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quiz Card */}
        <div
          className={`bg-card border border-border rounded-3xl overflow-hidden transition-all duration-500 ${isAnimating ? "animate-[slide-in-right_0.5s_ease-out]" : ""}`}
        >
          {/* Timer Bar */}
          <div className="w-full bg-muted h-2 border-b border-border">
            <div
              className={`h-full transition-all duration-1000 linear ${
                timeLeft <= 5 ? "bg-destructive" : "bg-primary"
              }`}
              style={{ width: `${timeProgress}%` }}
            />
          </div>

          <div className="p-8 md:p-12">
            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {quizQuestions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {quizQuestions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect =
                  index === quizQuestions[currentQuestion].correctAnswer;
                const showResult = selectedAnswer !== null;

                let buttonClasses =
                  "w-full p-5 text-left rounded-xl font-medium transition-all duration-300 ";

                if (!showResult) {
                  buttonClasses +=
                    "bg-muted hover:bg-primary/20 text-foreground border-2 border-border hover:border-primary";
                } else if (isSelected && isCorrect) {
                  buttonClasses +=
                    "bg-primary/20 text-foreground border-2 border-primary animate-[pulse_0.5s_ease-in-out]";
                } else if (isSelected && !isCorrect) {
                  buttonClasses +=
                    "bg-destructive/20 text-foreground border-2 border-destructive animate-[shake_0.5s_ease-in-out]";
                } else if (isCorrect) {
                  buttonClasses +=
                    "bg-primary/20 text-foreground border-2 border-primary";
                } else {
                  buttonClasses +=
                    "bg-muted text-muted-foreground border-2 border-border opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    className={buttonClasses}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <span className="symbols filled text-primary text-2xl">
                          check_circle
                        </span>
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <span className="symbols filled text-destructive text-2xl">
                          cancel
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            {selectedAnswer !== null && (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-xl transition-all duration-300 animate-[fade-in_0.3s_ease-out] flex items-center justify-center gap-2"
              >
                <span>
                  {currentQuestion === quizQuestions.length - 1
                    ? "Terminer le Quiz"
                    : "Question Suivante"}
                </span>
                <span className="symbols text-xl">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
