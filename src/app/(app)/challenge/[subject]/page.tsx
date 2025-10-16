
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectGrade } from "@/components/select-grade";
import { ChapterSelection } from "@/components/chapter-selection";
import { createChallenge } from "@/app/challenge/actions";
import { ChallengeView } from "./challenge-view";
import type { PersonalizedChallengeOutput } from "@/ai/flows/personalized-challenge-generation";
import { curriculumData, type Subject as CurriculumSubject, type Chapter } from "@/lib/curriculum-data";
import Link from "next/link";

export default function SubjectChallengePage() {
  const params = useParams<{ subject: string }>();
  const router = useRouter();
  const subject = useMemo(() => decodeURIComponent(params.subject as string) as CurriculumSubject, [params.subject]);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [challenge, setChallenge] = useState<PersonalizedChallengeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  useEffect(() => {
    if (selectedGrade) {
      const gradeNumber = parseInt(selectedGrade.replace("grade-", ""));
      const subjectChapters = curriculumData[gradeNumber]?.[subject] || [];
      setChapters(subjectChapters);
    } else {
      setChapters([]);
    }
    // Reset chapter and challenge when grade changes
    setSelectedChapter(null);
    setChallenge(null);
  }, [selectedGrade, subject]);

  const handleStartChallenge = async () => {
    if (!selectedChapter) return;
    setIsInitialLoading(true);
    const newChallenge = await createChallenge(subject);
    setChallenge(newChallenge);
    setIsInitialLoading(false);
  };
  
  const handleNewChallenge = async (forceEasy = false) => {
    setIsLoading(true);
    const newChallenge = await createChallenge(subject, forceEasy ? 'easy' : undefined);
    setChallenge(newChallenge);
    setIsLoading(false);
  };

  const resetChallenge = () => {
    setChallenge(null);
    setSelectedChapter(null);
    // Use the router to navigate without a full page reload
    router.push(`/challenge/${encodeURIComponent(subject)}`);
  };

  if (isInitialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
         <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating your first challenge...</p>
         </div>
      </div>
    );
  }

  if (challenge) {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden -m-6">
             <div className="mb-4 absolute top-4 left-4 z-10">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-background/80" onClick={resetChallenge}>
                    <ChevronLeft className="h-4 w-4" />
                    <span>Change Chapter</span>
                </Button>
            </div>
            <ChallengeView 
                initialChallenge={challenge} 
                subject={subject} 
                isLoadingChallenge={isLoading}
                onNewChallenge={handleNewChallenge}
            />
        </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
        <div className="mb-4 w-full max-w-md">
             <Button asChild variant="outline" size="sm">
                <Link href="/" className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                </Link>
            </Button>
        </div>
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            {subject} Challenge
          </h1>
          <p className="text-muted-foreground">
            Select your grade and a chapter to begin.
          </p>
        </div>
        <div className="space-y-4">
          <SelectGrade onGradeChange={setSelectedGrade} />
          <ChapterSelection 
            chapters={chapters} 
            disabled={!selectedGrade}
            onChapterChange={setSelectedChapter}
          />
        </div>
        <Button
          onClick={handleStartChallenge}
          disabled={!selectedChapter || isInitialLoading}
          size="lg"
        >
          {isInitialLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Start Challenge
        </Button>
      </div>
    </div>
  );
}
