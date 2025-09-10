// This file defines the User type. It is no longer a provider.

export type UserRole = 'learner' | 'teacher';

export type User = {
    email: string;
    picture?: string;
    role: UserRole;
}
