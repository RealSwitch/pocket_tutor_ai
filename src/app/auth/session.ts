import 'server-only';
import { cookies } from 'next/headers';
import type { User } from './auth-context';

export function getSession(): User | null {
    const sessionCookie = cookies().get('session');
    if (!sessionCookie) {
        return null;
    }

    try {
        const sessionData = JSON.parse(sessionCookie.value);
        if (sessionData.isLoggedIn) {
            return {
                email: sessionData.email,
                role: sessionData.role || 'learner',
            };
        }
    } catch (error) {
        console.error('Error parsing session cookie:', error);
    }
    
    return null;
}
