"use server";

import {
  generateStudyGuide,
  type GenerateStudyGuideInput,
  type GenerateStudyGuideOutput,
} from "@/ai/flows/generate-study-guide";

export async function getStudyGuide(
  subject: string,
  chapterTitle: string
): Promise<GenerateStudyGuideOutput> {
  const input: GenerateStudyGuideInput = {
    studentId: "student-123",
    subject: subject,
    gradeLevel: 10, // Assuming a default grade for now
    chapterTitle: chapterTitle,
    learningStyle: "reading/writing", // Assuming a default style
    learningHistory: "Struggles with abstract concepts, excels with concrete examples.",
  };

  try {
    const studyGuide = await generateStudyGuide(input);
    return studyGuide;
  } catch (error) {
    console.error("Error generating study guide:", error);
    // Return a fallback guide in case of an error
    return {
      topic: chapterTitle,
      summary: [`We're having trouble generating a study guide for ${chapterTitle}. Please try again in a moment.`],
      quiz: [],
    };
  }
}
