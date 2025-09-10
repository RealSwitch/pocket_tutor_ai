'use server';
/**
 * @fileOverview A Genkit flow for generating SVG backgrounds for math topics.
 *
 * - generateMathTheme - A function that generates an SVG background.
 * - MathThemeInput - The input type for the generateMathTheme function.
 * - MathThemeOutput - The return type for the generateMathTheme function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MathThemeInputSchema = z.object({
  topic: z
    .string()
    .describe('The specific math topic, e.g., "Trigonometry", "Algebra".'),
});
export type MathThemeInput = z.infer<typeof MathThemeInputSchema>;

const MathThemeOutputSchema = z.object({
  svgBackground: z
    .string()
    .describe('A string containing a complete, embeddable SVG image.'),
});
export type MathThemeOutput = z.infer<typeof MathThemeOutputSchema>;

export async function generateMathTheme(
  input: MathThemeInput
): Promise<MathThemeOutput> {
  return generateMathThemeFlow(input);
}

const mathThemePrompt = ai.definePrompt({
  name: 'mathThemePrompt',
  input: { schema: MathThemeInputSchema },
  output: { schema: MathThemeOutputSchema },
  prompt: `
    You are a creative designer specializing in mathematical vector art. Your task is to generate a visually appealing, subtle, and seamless SVG background pattern for a web page based on a given mathematics topic.

    Topic: {{{topic}}}

    Requirements:
    1.  The SVG should be a complete, self-contained, and valid SVG string.
    2.  The design must be a seamless pattern that can be tiled as a background. Use a <defs> block with a <pattern> element.
    3.  The pattern should contain mathematical formulas, symbols, and geometric shapes relevant to the specified topic. For example, for "Trigonometry", include sine waves, unit circles, and trig identities. For "Algebra", include variables like x and y, and simple equations.
    4.  The visual style should be minimalistic and elegant. Use thin strokes and a muted color palette.
    5.  The elements should be scattered across the pattern area to create a sense of dynamic, organized chaos.
    6.  IMPORTANT: The background of the SVG itself must be transparent. The strokes and fills of the elements should have a very low opacity (e.g., opacity="0.1" or opacity="0.05") to be "not too visible". Use a color that will be visible on both light and dark backgrounds, like a neutral gray or a muted version of a theme color.
    7.  The final output must be ONLY the SVG string, enclosed in <svg> tags. Do not include any other text, explanations, or markdown formatting.
  `,
  config: {
    model: 'googleai/gemini-2.5-flash',
  },
});

const generateMathThemeFlow = ai.defineFlow(
  {
    name: 'generateMathThemeFlow',
    inputSchema: MathThemeInputSchema,
    outputSchema: MathThemeOutputSchema,
  },
  async (input) => {
    const { output } = await mathThemePrompt(input);
    return output!;
  }
);
