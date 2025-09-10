'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized learning challenges based on a student's progress.
 *
 * - generatePersonalizedChallenge - A function that generates a personalized challenge for a student.
 * - PersonalizedChallengeInput - The input type for the generatePersonalizedChallenge function.
 * - PersonalizedChallengeOutput - The return type for the generatePersonalizedChallenge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedChallengeInputSchema = z.object({
  studentId: z.string().describe('The unique identifier of the student.'),
  subject: z.string().describe('The subject for which the challenge is generated (e.g., Mathematics, Accounting).'),
  gradeLevel: z.number().describe('The grade level of the student.'),
  learningHistory: z.string().optional().describe('A summary of the student\'s learning history and performance in the subject.'),
});
export type PersonalizedChallengeInput = z.infer<typeof PersonalizedChallengeInputSchema>;

const PersonalizedChallengeOutputSchema = z.object({
  challengeType: z.string().describe('The type of challenge generated (e.g., "Multiple Choice Question", "Short Answer Question", "Problem Set").'),
  challengeDescription: z.string().describe('A detailed description of the challenge, including instructions and objectives.'),
  difficultyLevel: z.string().describe('The difficulty level of the challenge (e.g., easy, medium, hard), adjusted based on the student\'s learning history.'),
  topic: z.string().describe('The specific topic covered by the challenge (e.g., fractions, ledger balancing, ecosystems).'),
});
export type PersonalizedChallengeOutput = z.infer<typeof PersonalizedChallengeOutputSchema>;

export async function generatePersonalizedChallenge(input: PersonalizedChallengeInput): Promise<PersonalizedChallengeOutput> {
  return personalizedChallengeFlow(input);
}

const personalizedChallengePrompt = ai.definePrompt({
  name: 'personalizedChallengePrompt',
  input: {schema: PersonalizedChallengeInputSchema},
  output: {schema: PersonalizedChallengeOutputSchema},
  prompt: `You are an AI-powered learning assistant that generates personalized challenges for students. Your goal is to create questions that are engaging, educational, and tailored to the student's needs, inspired by the Siyavula curriculum style which is clear, structured, and builds on core concepts.

  Based on the student's learning history, subject, and grade level, create a unique and randomized challenge.

  Student ID: {{{studentId}}}
  Subject: {{{subject}}}
  Grade Level: {{{gradeLevel}}}
  Learning History: {{{learningHistory}}}

  Generate a challenge that is appropriate for the student's level and learning needs. The challenge should be engaging, educational, and prevent copying.
  
  The challenge description should contain:
  1. A main question or problem to solve.
  2. One or two follow-up sub-questions that can be of different types (e.g., multiple-choice, true/false, or short-answer).
  3. A detailed, step-by-step solution to all parts of the question.

  Ensure the difficulty level is adapted to the student's individual learning progress. For example, if the student struggles with algebraic equations, provide a foundational question to build their confidence.
`,
});

const personalizedChallengeFlow = ai.defineFlow(
  {
    name: 'personalizedChallengeFlow',
    inputSchema: PersonalizedChallengeInputSchema,
    outputSchema: PersonalizedChallengeOutputSchema,
  },
  async input => {
    const {output} = await personalizedChallengePrompt(input);
    return output!;
  }
);
