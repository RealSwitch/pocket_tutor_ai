"use client";

import { useState, useEffect } from "react";
import type { PersonalizedChallengeOutput } from "@/ai/flows/personalized-challenge-generation";
import { createChallenge } from "../actions";
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
import { Loader2, Zap, Lightbulb, RefreshCw, Check } from "lucide-react";
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
  const [progress, setProgress] = useState(30);
  const [backgroundSvg, setBackgroundSvg] = useState<string | null>(null);

  const fetchBackground = async (topic: string) => {
    if (subject.toLowerCase() === "mathematics") {
      try {
        const theme = await generateMathTheme({ topic });
        setBackgroundSvg(theme.svgBackground);
      } catch (error) {
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
    const newChallenge = await createChallenge(subject);
    setChallenge(newChallenge);
    setProgress(Math.floor(Math.random() * 50) + 20); // Randomize progress
    setIsLoading(false);
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
          <div className="p-4 border rounded-lg min-h-[120px] bg-background/70">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <>
                <p className="font-semibold text-card-foreground mb-2">
                  {challenge.challengeType}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {challenge.challengeDescription}
                </p>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <Button variant="outline" disabled={isLoading}>
              <Lightbulb className="mr-2 h-4 w-4" /> Hint
            </Button>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              <Check className="mr-2 h-4 w-4" /> Submit
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
