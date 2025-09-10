'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { cookies } from 'next/headers';

const emailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function createMockSession(email: string) {
    const role = email.includes('teacher') ? 'teacher' : 'learner';
    const sessionData = {
        email: email,
        isLoggedIn: true,
        role: role,
    };
    const sessionCookie = JSON.stringify(sessionData);
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    cookies().set('session', sessionCookie, { maxAge: expiresIn });
}

export async function signInWithEmail(values: z.infer<typeof emailSchema>) {
  try {
    const validatedValues = emailSchema.parse(values);
    await createMockSession(validatedValues.email);
  } catch (error: any) {
    return { error: 'An unexpected error occurred during sign-in.' };
  }
  redirect('/');
}

export async function signUpWithEmail(values: z.infer<typeof emailSchema>) {
  try {
    const validatedValues = emailSchema.parse(values);
    await createMockSession(validatedValues.email);
  } catch (error: any) {
    return { error: 'An unexpected error occurred during sign-up.' };
  }
  redirect('/');
}

export async function signOut() {
    cookies().delete('session');
    redirect('/login');
}
