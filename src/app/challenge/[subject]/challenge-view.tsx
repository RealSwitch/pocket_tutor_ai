
"use client";

import { useState, useEffect, useCallback } from "react";
import type { PersonalizedChallengeOutput } from "@/ai/flows/personalized-challenge-generation";
import type { EvaluateAnswerOutput } from "@/ai/flows/evaluate-answer-flow";
import { createChallenge, evaluateStudentAnswer } from "../actions";
import { generateMathTheme } from "@/ai/flows/math-theme-generation";
import { generateScienceTheme } from "@/ai/flows/science-theme-generation";
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
import { Loader2, Zap, Lightbulb, RefreshCw, Check, Sparkles, Star, Target, CheckCircle, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

function ChallengeSkeleton() {
    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <Skeleton className="h-8 w-48 mb-2 animate-pulse" />
                        <Skeleton className="h-4 w-32 animate-pulse" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-8 w-24 rounded-full animate-pulse" />
                        <Skeleton className="h-6 w-20 rounded-full animate-pulse" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <p className="text-sm font-medium text-center text-muted-foreground">Generating your next challenge...</p>
                    <Skeleton className="h-4 w-full animate-pulse" />
                </div>
                <div className="p-4 border rounded-lg min-h-[120px] bg-background/70 space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full animate-pulse" />
                        <Skeleton className="h-4 w-full animate-pulse" />
                        <Skeleton className="h-4 w-3/4 animate-pulse" />
                    </div>
                </div>
                <div className="space-y-4">
                     <Skeleton className="h-24 w-full animate-pulse" />
                </div>

            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-36 animate-pulse" />
                    <Skeleton className="h-10 w-28 animate-pulse" />
                </div>
                <Skeleton className="h-10 w-40 animate-pulse" />
            </CardFooter>
        </Card>
    )
}


export function ChallengeView({
  initialChallenge,
  subject,
  isLoadingChallenge,
  onNewChallenge,
}: {
  initialChallenge: PersonalizedChallengeOutput;
  subject: string;
  isLoadingChallenge: boolean;
  onNewChallenge: (forceEasy?: boolean) => void;
}) {
  const [challenge, setChallenge] = useState(initialChallenge);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [backgroundSvg, setBackgroundSvg] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [evaluationResult, setEvaluationResult] = useState<EvaluateAnswerOutput | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const { toast } = useToast();

  // Gamification State
  const [xp, setXp] = useState(100); // Starting XP
  const [correctStreak, setCorrectStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const streakProgress = (correctStreak / 10) * 100;

  const fetchBackground = useCallback(async (topic: string) => {
    const lowerCaseSubject = subject.toLowerCase();
    try {
      let theme = null;
      if (lowerCaseSubject === "mathematics") {
        theme = await generateMathTheme({ topic });
      } else if (lowerCaseSubject === "physical science") {
        theme = await generateScienceTheme({ topic });
      }
      
      if (theme?.svgBackground) {
        setBackgroundSvg(theme.svgBackground);
      } else {
        setBackgroundSvg(null);
      }
    } catch (error) {
      console.error(`Error generating ${subject} theme:`, error);
      setBackgroundSvg(null);
    }
  }, [subject]);

  useEffect(() => {
    if (initialChallenge) {
      setChallenge(initialChallenge);
      fetchBackground(initialChallenge.topic);
      setAnswer("");
      setEvaluationResult(null);
      setShowSolution(false);
      setAttempts(0);
    }
  }, [initialChallenge, subject, fetchBackground]);


  const handleShowSolution = () => {
    if (!showSolution) {
        const pointsToSubtract = 20;
        setXp(prev => Math.max(0, prev - pointsToSubtract));
        toast({
            title: "Intel Revealed",
            description: `You used a hint and lost ${pointsToSubtract} XP.`,
            variant: "destructive"
        });
    }
    setShowSolution(!showSolution);
  }

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    setIsEvaluating(true);
    setEvaluationResult(null);
    
    setAttempts(prev => prev + 1);

    const fullProblem = `${challenge.problem}\n\n${challenge.subQuestions.map(q => q.question).join('\n')}`;
    const result = await evaluateStudentAnswer({
      problem: fullProblem,
      solution: challenge.solution,
      studentAnswer: answer,
    });
    setEvaluationResult(result);

    if (result.isCorrect) {
      // First attempt correct
      if (attempts === 0) {
        const newStreak = correctStreak + 1;
        setCorrectStreak(newStreak);
        
        if (newStreak === 10) {
            const bonusXp = 50;
            setXp(prev => prev + bonusXp);
            toast({
                title: "Incredible!",
                description: `10 objectives cleared in a row! You earned a ${bonusXp} XP bonus!`,
            });
            setCorrectStreak(0); // Reset streak after bonus
        } else {
             toast({
                title: "Objective Cleared!",
                description: `You are on a ${newStreak} mission streak!`,
             });
        }
      } else {
        // Correct, but not on the first try. No streak bonus, but no penalty.
         toast({
            title: "Objective Cleared!",
            description: "Good job working through the problem.",
         });
      }
      setQuestionsAnswered(prev => prev + 1);
    } else {
      // Incorrect answer
      const pointsToSubtract = 10;
      const newXp = Math.max(0, xp - pointsToSubtract);
      setXp(newXp);
      setCorrectStreak(0); // Reset streak on fail
      toast({
        title: "Mission Failed...",
        description: `You lost ${pointsToSubtract} XP. Re-evaluate your strategy or request intel.`,
        variant: "destructive"
      });

      if (newXp === 0) {
        toast({
            title: "XP Depleted!",
            description: "You'll now only receive easy missions to build your XP back up.",
        });
        // The next challenge will be forced to be easy
      }
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
        {isLoadingChallenge ? <ChallengeSkeleton /> : (
            <Card className="w-full max-w-2xl shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <Zap className="text-primary" />
                        {subject} Mission
                    </CardTitle>
                    <CardDescription>
                        Topic: {challenge.topic}
                    </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Badge
                            variant="outline"
                            className="text-lg font-bold font-mono flex items-center gap-2 border-amber-300 bg-amber-50 text-amber-800"
                        >
                            <Star className="text-amber-500" />
                            {xp} XP
                        </Badge>
                        <Badge
                            variant="outline"
                            className={`text-sm ${getDifficultyColor(
                            challenge.difficultyLevel
                            )}`}
                        >
                            {challenge.difficultyLevel}
                        </Badge>
                    </div>
                </div>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="space-y-1">
                    <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>10-Mission Streak</span>
                    <span>{correctStreak} / 10</span>
                    </div>
                    <Progress value={streakProgress} className="h-2" />
                </div>
                
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Target className="h-5 w-5 text-primary"/> Mission Objective</h3>
                    <div className="p-4 border rounded-lg bg-background/70">
                         <Latex>{challenge.problem}</Latex>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary"/> Your Report</h3>
                    <Textarea
                    placeholder="File your report here. Detail your findings and conclusion..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[120px] bg-background/70 font-mono"
                    disabled={isEvaluating || evaluationResult?.isCorrect || showSolution}
                    />
                    {evaluationResult && (
                    <Alert className={getFeedbackColor()}>
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle>{evaluationResult.isCorrect ? "Report Accepted" : "Report Needs Revision"}</AlertTitle>
                        <AlertDescription>{evaluationResult.feedback}</AlertDescription>
                    </Alert>
                    )}
                    {showSolution && (
                    <Alert variant="default" className="bg-muted/50">
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Intel Briefing</AlertTitle>
                        <AlertDescription className="whitespace-pre-wrap"><Latex>{challenge.solution}</Latex></AlertDescription>
                    </Alert>
                    )}
                </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleShowSolution} disabled={showSolution}>
                    <Lightbulb className="mr-2 h-4 w-4" /> {showSolution ? "Intel Revealed" : "Request Intel"}
                    </Button>
                    <Button
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isEvaluating || !answer.trim() || evaluationResult?.isCorrect || showSolution}
                    onClick={handleSubmitAnswer}
                    >
                    {isEvaluating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                    Submit Report
                    </Button>
                </div>
                <Button
                    variant="secondary"
                    onClick={() => onNewChallenge(xp === 0)}
                    disabled={(!evaluationResult?.isCorrect && !showSolution) || isLoadingChallenge}
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    New Mission
                </Button>
                </CardFooter>
            </Card>
        )}
    </div>
  );
}
