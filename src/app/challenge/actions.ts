"use server";

import {
  generatePersonalizedChallenge,
  type PersonalizedChallengeOutput,
  type PersonalizedChallengeInput,
} from "@/ai/flows/personalized-challenge-generation";

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
      challengeType: "Fallback Puzzle",
      challengeDescription:
        `Solve this puzzle about ${subject}. Since we're having trouble generating a new challenge, please try again in a moment.`,
      difficultyLevel: "Medium",
      topic: "General Knowledge",
    };
  }
}
