
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserRole = 'learner' | 'teacher' | 'parent';

type SessionData = {
    email: string;
    isLoggedIn: true;
    role: UserRole;
};

function createMockSessionData(email: string): SessionData {
    let role: UserRole = 'learner';
    if (email.includes('teacher')) {
        role = 'teacher';
    } else if (email.includes('parent')) {
        role = 'parent';
    }
    return {
        email: email,
        isLoggedIn: true,
        role: role,
    };
}

export async function signInWithEmail(values: z.infer<typeof formSchema>) {
  // In a real app, you'd validate credentials against a database here.
  const validated = formSchema.safeParse(values);
  if (!validated.success) {
    // This won't be shown to the user with this pattern,
    // but it's good practice for validation.
    // In a real app, you would return an error and display it.
    return;
  }

  const sessionData = createMockSessionData(validated.data.email);
  cookies().set('session', JSON.stringify(sessionData), {
      path: '/',
      maxAge: 60 * 60 * 24 * 5, // 5 days
  });
  
  redirect('/');
}

export async function signUpWithEmail(values: z.infer<typeof formSchema>) {
   // In a real app, you'd create a new user in the database here.
   const validated = formSchema.safeParse(values);
   if (!validated.success) {
     return;
   }

  const sessionData = createMockSessionData(validated.data.email);
  cookies().set('session', JSON.stringify(sessionData), {
      path: '/',
      maxAge: 60 * 60 * 24 * 5, // 5 days
  });

  redirect('/');
}

export async function signOut() {
    cookies().delete('session');
    redirect('/login');
}
