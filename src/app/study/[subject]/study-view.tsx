'use client';

import { useState, useEffect } from 'react';
import type { GenerateStudyGuideOutput, QuizQuestion } from '@/ai/flows/generate-study-guide';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, X, Clock, Trophy, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import { useToast } from '@/hooks/use-toast';

const TWO_HOURS_IN_SECONDS = 2 * 60 * 60;

export function StudyView({ studyGuide }: { studyGuide: GenerateStudyGuideOutput }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isStudying, setIsStudying] = useState(true);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TWO_HOURS_IN_SECONDS);
  const { toast } = useToast();

  const currentQuestion: QuizQuestion | undefined = studyGuide.quiz[currentQuestionIndex];
  const summaryPages = studyGuide.summary || [];
  const isLastSlide = currentSlide === summaryPages.length - 1;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQuizStarted && !isQuizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timeLeft === 0 && isQuizStarted && !isQuizFinished) {
      handleFinishQuiz();
    }
    return () => clearInterval(timer);
  }, [isQuizStarted, isQuizFinished, timeLeft]);


  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < studyGuide.quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };
  
  const handleNextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setIsStudying(false);
      setIsQuizStarted(true);
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };


  const handleFinishQuiz = () => {
    let finalScore = 0;
    for (let i = 0; i < studyGuide.quiz.length; i++) {
      if (selectedAnswers[i] === studyGuide.quiz[i].correctAnswer) {
        finalScore++;
      }
    }
    setScore(finalScore);
    setIsQuizFinished(true);

    if (finalScore === studyGuide.quiz.length && timeLeft > 0) {
        toast({
            title: "Module Complete!",
            description: "You passed with a perfect score in time! You've earned 250 bonus XP!",
            variant: "default",
            duration: 5000,
        });
    } else if (finalScore === studyGuide.quiz.length) {
        toast({
            title: "Module Complete!",
            description: "You passed with a perfect score, but you ran out of time for the bonus.",
            variant: "default",
        });
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  if (isQuizFinished) {
    return (
        <div className="flex-1 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl text-center">
                <CardHeader>
                <CardTitle className="font-headline text-2xl">Quiz Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <p className="text-4xl font-bold">
                    You scored {score} out of {studyGuide.quiz.length}
                </p>
                <Progress value={(score / studyGuide.quiz.length) * 100} className="w-full" />
                {score === studyGuide.quiz.length ? (
                    <Alert className="border-green-500 bg-green-50">
                        <Trophy className="h-4 w-4" />
                        <AlertTitle>Congratulations!</AlertTitle>
                        <AlertDescription>
                            {timeLeft > 0 ? "You passed with a perfect score and earned a 250 XP bonus for finishing in time!" : "You passed with a perfect score! Great job."}
                        </AlertDescription>
                    </Alert>
                ): (
                    <Alert variant="destructive">
                        <X className="h-4 w-4" />
                        <AlertTitle>Keep Trying!</AlertTitle>
                        <AlertDescription>
                            You didn't pass this time. Review the material and try again!
                        </AlertDescription>
                    </Alert>
                )}
                </CardContent>
            </Card>
        </div>
    )
  }

  if (isQuizStarted) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="font-headline text-xl">
                    Quiz: {studyGuide.topic}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(timeLeft)}</span>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {studyGuide.quiz.length}
              </p>
              <Progress value={((currentQuestionIndex + 1) / studyGuide.quiz.length) * 100} />
            </div>
            <div className="p-4 border rounded-lg min-h-[100px] bg-background/70">
              <p className="font-semibold text-card-foreground leading-relaxed">
                {currentQuestion && <Latex>{currentQuestion.question}</Latex>}
              </p>
            </div>
            <RadioGroup
              value={selectedAnswers[currentQuestionIndex]}
              onValueChange={handleAnswerSelect}
              className="space-y-2"
            >
              {currentQuestion && currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer p-3 border rounded-md hover:bg-muted/50 has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground has-[input:checked]:border-primary">
                    <Latex>{option}</Latex>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]}>
              {currentQuestionIndex < studyGuide.quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-primary" />
            Study Guide: {studyGuide.topic}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-6">
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none h-full">
                <Latex>{summaryPages[currentSlide] || ''}</Latex>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                 <Button variant="outline" onClick={handlePreviousSlide} disabled={currentSlide === 0}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                 <Button onClick={handleNextSlide}>
                    {isLastSlide ? 'Start Quiz' : 'Next'}
                    {!isLastSlide && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
            </div>
            <p className="text-sm text-muted-foreground">
                Page {currentSlide + 1} of {summaryPages.length}
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
