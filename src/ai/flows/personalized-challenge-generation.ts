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
  challengeType: z.string().describe('The type of challenge generated (e.g., mini-game, simulation, puzzle).'),
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
  prompt: `You are an AI-powered learning assistant that generates personalized challenges for students.

  Based on the student's learning history, subject, and grade level, create a unique and randomized challenge that focuses on their weaknesses and prevents cheating.

  Student ID: {{{studentId}}}
  Subject: {{{subject}}}
  Grade Level: {{{gradeLevel}}}
  Learning History: {{{learningHistory}}}

  Generate a challenge that is appropriate for the student's level and learning needs.  The challenge should be engaging, educational, and prevent copying.
  Consider various challenge types such as mini-games, simulations and puzzles.
  Include a detailed challenge description, a difficulty level, and the specific topic covered.
  Ensure the difficulty level is adapted to the student's individual learning progress.
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
