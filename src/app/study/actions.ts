
"use server";

import {
  generateStudyGuide,
  type GenerateStudyGuideInput,
  type GenerateStudyGuideOutput,
} from "@/ai/flows/generate-study-guide";
import { generateImage } from "@/ai/flows/generate-image-flow";

export async function getStudyGuide(
  subject: string,
  chapterTitle: string
): Promise<GenerateStudyGuideOutput> {
  const input: GenerateStudyGuideInput = {
    studentId: "student-123",
    subject: subject,
    gradeLevel: 10, // Assuming a default grade for now
    chapterTitle: chapterTitle,
    learningStyle: "visual", // Prioritizing visual learning style for image generation
    learningHistory: "Struggles with abstract concepts, excels with concrete examples.",
  };

  try {
    // 1. Generate the study guide with text and image prompts
    const studyGuideContent = await generateStudyGuide(input);

    // 2. Generate images for each slide in parallel
    const imagePromises = studyGuideContent.summary.map(slide => 
      generateImage({ prompt: slide.imagePrompt })
    );
    const generatedImages = await Promise.all(imagePromises);

    // 3. Combine the generated images with the slide data
    const summaryWithImages = studyGuideContent.summary.map((slide, index) => ({
      ...slide,
      imageUrl: generatedImages[index].imageUrl,
    }));

    return {
      ...studyGuideContent,
      summary: summaryWithImages,
    };

  } catch (error) {
    console.error("Error generating study guide:", error);
    // Return a fallback guide in case of an error
    return {
      topic: chapterTitle,
      summary: [{ text: `We're having trouble generating a study guide for ${chapterTitle}. Please try again in a moment.`, imagePrompt: 'error icon' }],
      quiz: [],
    };
  }
}
