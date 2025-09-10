
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';

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

export async function signInWithEmail(values: z.infer<typeof emailSchema>): Promise<{ success: true; session: SessionData } | { error: string }> {
  try {
    const validatedValues = emailSchema.parse(values);
    const sessionData = createMockSessionData(validatedValues.email);
    // The form on the client will now handle setting the cookie.
    return { success: true, session: sessionData };
  } catch (error: any) {
    return { error: 'An unexpected error occurred during sign-in.' };
  }
}

export async function signUpWithEmail(values: z.infer<typeof emailSchema>): Promise<{ success: true; session: SessionData } | { error: string }> {
  try {
    const validatedValues = emailSchema.parse(values);
    const sessionData = createMockSessionData(validatedValues.email);
     // The form on the client will now handle setting the cookie.
    return { success: true, session: sessionData };
  } catch (error: any) {
    return { error: 'An unexpected error occurred during sign-up.' };
  }
}

export async function signOut() {
    cookies().delete('session');
}
