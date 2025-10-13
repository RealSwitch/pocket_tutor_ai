
'use server';
/**
 * @fileOverview A Genkit flow for generating personalized study guides and quizzes.
 *
 * - generateStudyGuide - A function that creates a personalized study guide and a quiz.
 * - GenerateStudyGuideInput - The input type for the generateStudyGuide function.
 * - GenerateStudyGuideOutput - The return type for the generateStudyGuide function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateStudyGuideInputSchema = z.object({
  studentId: z.string().describe('The unique identifier of the student.'),
  subject: z.string().describe('The subject for which the study guide is generated.'),
  gradeLevel: z.number().describe('The grade level of the student.'),
  chapterTitle: z.string().describe('The title of the chapter to be summarized.'),
  learningStyle: z.string().describe('The student\'s preferred learning style (e.g., "visual", "auditory", "kinesthetic", "reading/writing").'),
  learningHistory: z.string().optional().describe('A summary of the student\'s learning history and performance.'),
});
export type GenerateStudyGuideInput = z.infer<typeof GenerateStudyGuideInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string().describe("The quiz question."),
    options: z.array(z.string()).describe("A list of 4 multiple-choice options."),
    correctAnswer: z.string().describe("The correct answer from the options."),
});

const GenerateStudyGuideOutputSchema = z.object({
  topic: z.string().describe('The specific topic covered by the study guide.'),
  summary: z.array(z.string()).describe('A detailed, personalized summary of the chapter, broken down into smaller, digestible "slides". Each item in the array is a separate slide. Formatted in Markdown, using LaTeX for all mathematical notation.'),
  quiz: z.array(QuizQuestionSchema).length(10).describe('An array of 10 quiz questions based on the summary.'),
});
export type GenerateStudyGuideOutput = z.infer<typeof GenerateStudyGuideOutputSchema>;
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export async function generateStudyGuide(
  input: GenerateStudyGuideInput
): Promise<GenerateStudyGuideOutput> {
  return generateStudyGuideFlow(input);
}

const studyGuidePrompt = ai.definePrompt({
  name: 'studyGuidePrompt',
  input: { schema: GenerateStudyGuideInputSchema },
  output: { schema: GenerateStudyGuideOutputSchema },
  prompt: `
    You are an expert AI educator. Your task is to create a personalized study guide and a quiz for a student based on their learning profile and the chapter they want to study.

    Student ID: {{{studentId}}}
    Subject: {{{subject}}}
    Grade Level: {{{gradeLevel}}}
    Chapter: {{{chapterTitle}}}
    Learning Style: {{{learningStyle}}}
    Learning History: {{{learningHistory}}}

    **Instructions:**

    1.  **Generate a Personalized Summary:**
        *   Create a comprehensive summary of the chapter: **{{{chapterTitle}}}**.
        *   **CRITICAL:** Break the summary down into smaller, digestible "slides". The 'summary' field in the output MUST be an array of strings.
        *   **CRITICAL:** Each string in the 'summary' array represents one slide and MUST NOT exceed 35 words.
        *   The summary MUST be tailored to the student's learning style: **'{{{learningStyle}}}'**.
            *   For a **visual** learner, include descriptions of diagrams, charts, or visual analogies.
            *   For a **reading/writing** learner, provide a detailed, text-rich explanation with clear headings and bullet points.
            *   For a **kinesthetic** learner, suggest real-world examples or simple activities.
            *   For an **auditory** learner, structure the text as if it were a script for a podcast.
        *   Each page of the summary should be written in Markdown format.
        *   All mathematical equations, variables, and symbols must be formatted using LaTeX (e.g., '$x^2 + y^2 = r^2$').

    2.  **Create a 10-Question Quiz:**
        *   Based on the summary you just generated, create a quiz with exactly 10 multiple-choice questions.
        *   Each question must have 4 options.
        *   Specify the correct answer for each question.
        *   The questions should cover the key concepts of the chapter.
  `,
});

const generateStudyGuideFlow = ai.defineFlow(
  {
    name: 'generateStudyGuideFlow',
    inputSchema: GenerateStudyGuideInputSchema,
    outputSchema: GenerateStudyGuideOutputSchema,
  },
  async (input) => {
    const { output } = await studyGuidePrompt(input);
    return output!;
  }
);
