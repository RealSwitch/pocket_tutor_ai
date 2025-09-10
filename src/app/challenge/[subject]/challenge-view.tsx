"use client";

import { useState, useEffect } from "react";
import type { PersonalizedChallengeOutput } from "@/ai/flows/personalized-challenge-generation";
import type { EvaluateAnswerOutput } from "@/ai/flows/evaluate-answer-flow";
import { createChallenge, evaluateStudentAnswer } from "../actions";
import { generateMathTheme } from "@/ai/flows/math-theme-generation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Zap, Lightbulb, RefreshCw, Check, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export function ChallengeView({
  initialChallenge,
  subject,
}: {
  initialChallenge: PersonalizedChallengeOutput;
  subject: string;
}) {
  const [challenge, setChallenge] = useState(initialChallenge);
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [progress, setProgress] = useState(30);
  const [backgroundSvg, setBackgroundSvg] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [evaluationResult, setEvaluationResult] = useState<EvaluateAnswerOutput | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const fetchBackground = async (topic: string) => {
    if (subject.toLowerCase() === "mathematics") {
      try {
        const theme = await generateMathTheme({ topic });
        setBackgroundSvg(theme.svgBackground);
      } catch (error)
      {
        console.error("Error generating math theme:", error);
        setBackgroundSvg(null);
      }
    }
  };

  useEffect(() => {
    fetchBackground(challenge.topic);
  }, [challenge.topic, subject]);

  const handleNewChallenge = async () => {
    setIsLoading(true);
    setBackgroundSvg(null);
    setAnswer("");
    setEvaluationResult(null);
    setShowSolution(false);
    const newChallenge = await createChallenge(subject);
    setChallenge(newChallenge);
    setProgress(Math.floor(Math.random() * 50) + 20); // Randomize progress
    setIsLoading(false);
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    setIsEvaluating(true);
    setEvaluationResult(null);
    const fullProblem = `${challenge.problem}\n\n${challenge.subQuestions.map(q => q.question).join('\n')}`;
    const result = await evaluateStudentAnswer({
      problem: fullProblem,
      solution: challenge.solution,
      studentAnswer: answer,
    });
    setEvaluationResult(result);
    if(result.isCorrect) {
      setProgress(prev => Math.min(100, prev + 25));
    }
    setIsEvaluating(false);
  };

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
    const getFeedbackColor = () => {
    if (!evaluationResult) return "";
    return evaluationResult.isCorrect ? "border-green-500 bg-green-50" : "border-amber-500 bg-amber-50";
  };


  const backgroundStyle: React.CSSProperties = backgroundSvg
    ? {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          backgroundSvg
        )}")`,
        backgroundSize: "cover",
      }
    : {};

  return (
    <div
      className="flex-1 flex items-center justify-center p-4 transition-all duration-1000"
      style={backgroundStyle}
    >
      <Card className="w-full max-w-2xl shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Zap className="text-primary" />
                {subject} Challenge
              </CardTitle>
              <CardDescription>
                {isLoading ? (
                  <Skeleton className="h-4 w-48 mt-1" />
                ) : (
                  challenge.topic
                )}
              </CardDescription>
            </div>
            {isLoading ? (
              <Skeleton className="h-6 w-20 rounded-full" />
            ) : (
              <Badge
                variant="outline"
                className={`text-sm ${getDifficultyColor(
                  challenge.difficultyLevel
                )}`}
              >
                {challenge.difficultyLevel}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="p-4 border rounded-lg min-h-[120px] bg-background/70 space-y-4">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <>
                <p className="font-semibold text-card-foreground leading-relaxed">
                  {challenge.problem}
                </p>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                  {challenge.subQuestions.map((sq, index) => (
                    <li key={index}>{sq.question}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="space-y-4">
             <Textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="min-h-[100px] bg-background/70"
                disabled={isEvaluating || isLoading}
             />
             {evaluationResult && (
                 <Alert className={getFeedbackColor()}>
                   <Sparkles className="h-4 w-4" />
                   <AlertTitle>Feedback</AlertTitle>
                   <AlertDescription>{evaluationResult.feedback}</AlertDescription>
                 </Alert>
             )}
            {showSolution && (
                 <Alert variant="default" className="bg-muted/50">
                   <Lightbulb className="h-4 w-4" />
                   <AlertTitle>Solution</AlertTitle>
                   <AlertDescription className="whitespace-pre-wrap">{challenge.solution}</AlertDescription>
                 </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSolution(!showSolution)} disabled={isLoading}>
              <Lightbulb className="mr-2 h-4 w-4" /> {showSolution ? "Hide" : "Show"} Solution
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading || isEvaluating || !answer.trim()}
              onClick={handleSubmitAnswer}
            >
              {isEvaluating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
               Submit
            </Button>
          </div>
          <Button
            variant="secondary"
            onClick={handleNewChallenge}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            New Challenge
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
