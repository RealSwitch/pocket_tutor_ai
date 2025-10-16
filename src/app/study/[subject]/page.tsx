
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectGrade } from "@/components/select-grade";
import { ChapterSelection } from "@/components/chapter-selection";
import { getStudyGuide } from "../actions";
import { StudyView } from "./study-view";
import type { GenerateStudyGuideOutput } from "@/ai/flows/generate-study-guide";
import { curriculumData, type Subject as CurriculumSubject, type Chapter } from "@/lib/curriculum-data";

export default function SubjectStudyPage() {
  const params = useParams<{ subject: string }>();
  const subject = useMemo(() => decodeURIComponent(params.subject as string) as CurriculumSubject, [params.subject]);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [studyGuide, setStudyGuide] = useState<GenerateStudyGuideOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedGrade) {
      const gradeNumber = parseInt(selectedGrade.replace("grade-", ""));
      const subjectChapters = curriculumData[gradeNumber]?.[subject] || [];
      setChapters(subjectChapters);
    } else {
      setChapters([]);
    }
    setSelectedChapter(null);
    setStudyGuide(null);
  }, [selectedGrade, subject]);

  const handleStartStudySession = async () => {
    if (!selectedChapter) return;
    setIsLoading(true);
    const chapterTitle = chapters.find(c => c.id === selectedChapter)?.title;
    if (chapterTitle) {
      const newStudyGuide = await getStudyGuide(subject, chapterTitle);
      setStudyGuide(newStudyGuide);
    }
    setIsLoading(false);
  };

  const resetStudySession = () => {
    setStudyGuide(null);
    setSelectedGrade(null);
    setSelectedChapter(null);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
         <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating your personalized study guide...</p>
         </div>
      </div>
    );
  }

  if (studyGuide) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
             <div className="mb-4 absolute top-6 left-6 z-10">
                <Button onClick={resetStudySession} variant="outline" size="sm" className="flex items-center gap-2">
                     <ChevronLeft className="h-4 w-4" />
                    <span>Change Chapter</span>
                </Button>
            </div>
            <StudyView studyGuide={studyGuide} />
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
       <div className="mb-4 absolute top-6 left-6 z-10">
        <Button asChild variant="outline" size="sm">
          <a href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </a>
        </Button>
      </div>
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            {subject} Study Session
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
          onClick={handleStartStudySession}
          disabled={!selectedChapter || isLoading}
          size="lg"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Start Studying
        </Button>
      </div>
    </div>
  );
}
