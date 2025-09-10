"use server";

import {
  generatePersonalizedChallenge,
  type PersonalizedChallengeOutput,
  type PersonalizedChallengeInput,
} from "@/ai/flows/personalized-challenge-generation";
import {
  evaluateAnswer,
  type EvaluateAnswerInput,
  type EvaluateAnswerOutput,
} from "@/ai/flows/evaluate-answer-flow";


export async function createChallenge(
  subject: string
): Promise<PersonalizedChallengeOutput> {
  const input: PersonalizedChallengeInput = {
    studentId: "student-123",
    subject: subject,
    gradeLevel: 8,
    learningHistory:
      "The student shows strong performance in geometric concepts but struggles with algebraic equations and fractions. They respond well to visual and interactive learning methods.",
  };

  try {
    const challenge = await generatePersonalizedChallenge(input);
    return challenge;
  } catch (error) {
    console.error("Error generating personalized challenge:", error);
    // Return a fallback challenge in case of an error
    return {
      topic: "General Knowledge",
      difficultyLevel: "Medium",
      problem: `We're having trouble generating a new challenge for ${subject}. Please try again in a moment.`,
      subQuestions: [],
      solution: "Please try again later.",
    };
  }
}

export async function evaluateStudentAnswer(input: EvaluateAnswerInput): Promise<EvaluateAnswerOutput> {
  try {
    const result = await evaluateAnswer(input);
    return result;
  } catch (error) {
    console.error("Error evaluating answer:", error);
    return {
      isCorrect: false,
      feedback: "Sorry, I couldn't evaluate your answer right now. Please try again.",
      confidence: 0,
    };
  }
}
