'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const emailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SessionData = {
    email: string;
    isLoggedIn: true;
    role: 'learner' | 'teacher';
};

function createMockSessionData(email: string): SessionData {
    const role = email.includes('teacher') ? 'teacher' : 'learner';
    return {
        email: email,
        isLoggedIn: true,
        role: role,
    };
}

export async function signInWithEmail(values: z.infer<typeof emailSchema>) {
  try {
    const validatedValues = emailSchema.parse(values);
    // In a real app, you'd validate credentials against a database here.
    const sessionData = createMockSessionData(validatedValues.email);
    cookies().set('session', JSON.stringify(sessionData), {
        path: '/',
        maxAge: 60 * 60 * 24 * 5, // 5 days
    });
    return { success: true };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid email or password format.' };
    }
    return { error: 'An unexpected error occurred during sign-in.' };
  }
}

export async function signUpWithEmail(values: z.infer<typeof emailSchema>) {
  try {
    const validatedValues = emailSchema.parse(values);
     // In a real app, you'd create a new user in the database here.
    const sessionData = createMockSessionData(validatedValues.email);
    cookies().set('session', JSON.stringify(sessionData), {
        path: '/',
        maxAge: 60 * 60 * 24 * 5, // 5 days
    });
    return { success: true };
  } catch (error: any) {
     if (error instanceof z.ZodError) {
      return { error: 'Invalid email or password format.' };
    }
    return { error: 'An unexpected error occurred during sign-up.' };
  }
}

export async function signOut() {
    cookies().delete('session');
    redirect('/login');
}
