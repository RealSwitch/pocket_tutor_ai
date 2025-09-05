'use server';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { auth as adminAuth } from 'firebase-admin';
import { initializeAdminApp } from '@/lib/firebase-admin';

const emailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function setSessionCookie(idToken: string) {
    await initializeAdminApp();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn });
    cookies().set('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
}

export async function signInWithEmail(values: z.infer<typeof emailSchema>) {
  try {
    const validatedValues = emailSchema.parse(values);
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      validatedValues.email,
      validatedValues.password
    );

    const idToken = await userCredential.user.getIdToken();
    await setSessionCookie(idToken);

  } catch (error: any) {
    let errorMessage = 'An unexpected error occurred.';
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password.';
          break;
        case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
        default:
          errorMessage = error.message;
          break;
      }
    }
    return { error: errorMessage };
  }
  redirect('/');
}

export async function signUpWithEmail(values: z.infer<typeof emailSchema>) {
  try {
    const validatedValues = emailSchema.parse(values);
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      validatedValues.email,
      validatedValues.password
    );
     const idToken = await userCredential.user.getIdToken();
     await setSessionCookie(idToken);
  } catch (error: any) {
     let errorMessage = 'An unexpected error occurred.';
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
        case 'auth/weak-password':
            errorMessage = 'The password is too weak.';
            break;
        default:
          errorMessage = error.message;
          break;
      }
    }
    return { error: errorMessage };
  }
  redirect('/');
}

export async function signOut() {
    cookies().delete('session');
    redirect('/login');
}

export async function createSession(idToken: string) {
    await setSessionCookie(idToken);
    redirect('/');
}
