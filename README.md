# PocketTutorAI: A Gamified Learning Platform

Welcome to PocketTutorAI, an AI-powered, gamified learning platform built with Next.js and Firebase Studio. This application is designed to make learning more engaging and effective by providing personalized challenges, interactive study guides, and a rewarding user experience.

## ✨ Features

- **Personalized Learning Challenges**: AI-generated challenges tailored to each student's grade level, subject, and learning history.
- **Gamified Missions**: Challenges are presented as "missions" with XP, streaks, and a narrative-driven UI to boost engagement.
- **Interactive Study Guides**: AI-generated, multi-page study guides presented as slides, complete with custom images for each concept.
- **Thematic Backgrounds**: Dynamically generated SVG backgrounds that match the topic of the current challenge, creating a more immersive experience.
- **Teacher & Student Roles**: A dual-role system allowing for both learner and teacher dashboards (mock implementation).
- **Classroom Management**: Teachers can create classrooms, manage students, and monitor their progress (mock implementation).
- **Rewards System**: Students can redeem points earned from challenges for real-world rewards.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI**: [Genkit](https://firebase.google.com/docs/genkit) for generative AI flows
- **UI**: [React](https://react.dev/), [ShadCN UI](https://ui.shadcn.com/), and [Tailwind CSS](https://tailwindcss.com/)
- **Platform**: Developed in [Firebase Studio](https://firebase.google.com/docs/studio)

## Getting Started

The application is structured as a standard Next.js project.

- The main dashboard is located at `src/app/page.tsx`.
- AI generation logic can be found in the `src/ai/flows/` directory.
- The core UI components are in `src/components/`.

Explore the different pages and features to see how it all comes together!
