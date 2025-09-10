'use server';
/**
 * @fileOverview A Genkit flow for evaluating a student's answer to a challenge.
 *
 * - evaluateAnswer - A function that evaluates a student's answer.
 * - EvaluateAnswerInput - The input type for the evaluateAnswer function.
 * - EvaluateAnswerOutput - The return type for the evaluateAnswer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EvaluateAnswerInputSchema = z.object({
  problem: z.string().describe('The full problem statement, including sub-questions.'),
  solution: z.string().describe('The correct, detailed solution to the problem.'),
  studentAnswer: z.string().describe("The student's submitted answer."),
});
export type EvaluateAnswerInput = z.infer<typeof EvaluateAnswerInputSchema>;

const EvaluateAnswerOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the student\'s answer is correct or conceptually sound.'),
  feedback: z.string().describe('Constructive feedback for the student. If incorrect, provide a hint or ask a clarifying question without giving away the solution. If correct, provide encouragement.'),
  confidence: z.number().min(0).max(1).describe('A score from 0 to 1 indicating the AI\'s confidence in its evaluation.'),
});
export type EvaluateAnswerOutput = z.infer<typeof EvaluateAnswerOutputSchema>;

export async function evaluateAnswer(
  input: EvaluateAnswerInput
): Promise<EvaluateAnswerOutput> {
  return evaluateAnswerFlow(input);
}

const evaluateAnswerPrompt = ai.definePrompt({
  name: 'evaluateAnswerPrompt',
  input: { schema: EvaluateAnswerInputSchema },
  output: { schema: EvaluateAnswerOutputSchema },
  prompt: `
    You are an expert AI tutor. Your task is to evaluate a student's answer to a given problem.

    Problem Statement:
    {{{problem}}}

    Correct Solution:
    {{{solution}}}

    Student's Answer:
    {{{studentAnswer}}}

    Your evaluation must follow these rules:
    1.  **Assess Correctness:** Determine if the student's answer is correct. For text-based answers, this includes checking for paraphrasing or conceptual understanding, not just exact wording. For calculations, check if the steps and the final result are correct.
    2.  **Provide Feedback:**
        *   **If the answer is correct:** Provide positive reinforcement (e.g., "Great job!", "Excellent work!").
        *   **If the answer is partially correct or on the right track:** Acknowledge the correct parts and provide a gentle hint towards the incorrect parts.
        *   **If the answer is incorrect:** Do NOT provide the correct solution. Instead, give a constructive hint or ask a clarifying question to prompt the student to reconsider their approach. For example, if a calculation step is missing, ask "Can you walk me through how you got to that step?". If there's a conceptual misunderstanding, ask a question that targets it.
    3.  **Set isCorrect flag:** Set to 'true' if the answer is functionally correct, otherwise 'false'.
    4.  **Set Confidence:** Provide a confidence score for your evaluation.
  `,
});

const evaluateAnswerFlow = ai.defineFlow(
  {
    name: 'evaluateAnswerFlow',
    inputSchema: EvaluateAnswerInputSchema,
    outputSchema: EvaluateAnswerOutputSchema,
  },
  async (input) => {
    const { output } = await evaluateAnswerPrompt(input);
    return output!;
  }
);
