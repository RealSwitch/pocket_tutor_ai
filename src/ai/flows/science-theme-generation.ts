
'use server';
/**
 * @fileOverview A Genkit flow for generating SVG backgrounds for science topics.
 *
 * - generateScienceTheme - A function that generates an SVG background.
 * - ScienceThemeInput - The input type for the generateScienceTheme function.
 * - ScienceThemeOutput - The return type for the generateScienceTheme function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ScienceThemeInputSchema = z.object({
  topic: z
    .string()
    .describe('The specific science topic, e.g., "Newton\'s Laws", "Chemical Reactions".'),
});
export type ScienceThemeInput = z.infer<typeof ScienceThemeInputSchema>;

const ScienceThemeOutputSchema = z.object({
  svgBackground: z
    .string()
    .describe('A string containing a complete, embeddable SVG image.'),
});
export type ScienceThemeOutput = z.infer<typeof ScienceThemeOutputSchema>;

export async function generateScienceTheme(
  input: ScienceThemeInput
): Promise<ScienceThemeOutput> {
  return generateScienceThemeFlow(input);
}

const scienceThemePrompt = ai.definePrompt({
  name: 'scienceThemePrompt',
  input: { schema: ScienceThemeInputSchema },
  output: { schema: ScienceThemeOutputSchema },
  prompt: `
    You are a creative designer specializing in scientific vector art. Your task is to generate a visually appealing, subtle, and seamless SVG background pattern for a web page based on a given physical science topic.

    Topic: {{{topic}}}

    Requirements:
    1.  The SVG should be a complete, self-contained, and valid SVG string.
    2.  The design must be a seamless pattern that can be tiled as a background. Use a <defs> block with a <pattern> element.
    3.  The pattern should contain scientific formulas, symbols, diagrams, and equipment relevant to the specified topic. For example, for "Newton's Laws", include force diagrams, F=ma, and apple motifs. For "Chemistry", include beakers, molecules, and chemical equations.
    4.  The visual style should be minimalistic and elegant. Use thin strokes and a muted color palette.
    5.  The elements should be scattered across the pattern area to create a sense of dynamic, organized chaos.
    6.  IMPORTANT: The background of the SVG itself must be transparent. The strokes and fills of the elements should have a very low opacity (e.g., opacity="0.1" or opacity="0.05") to be "not too visible". Use a color that will be visible on both light and dark backgrounds, like a neutral gray or a muted version of a theme color.
    7.  The final output must be ONLY the SVG string, enclosed in <svg> tags. Do not include any other text, explanations, or markdown formatting.
  `,
  model: 'googleai/gemini-2.5-flash',
});

const generateScienceThemeFlow = ai.defineFlow(
  {
    name: 'generateScienceThemeFlow',
    inputSchema: ScienceThemeInputSchema,
    outputSchema: ScienceThemeOutputSchema,
  },
  async (input) => {
    const { output } = await scienceThemePrompt(input);
    return output!;
  }
);
