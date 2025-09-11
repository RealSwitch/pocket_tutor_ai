
'use client';

import { MainLayout } from '@/components/main-layout';
import { useAuth } from '@/app/auth/auth-context';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = useAuth();
  
  // The AuthProvider should handle redirects, so user should not be null here.
  if (!session?.isLoggedIn || !session.user) {
    return null;
  }

  return (
    <MainLayout user={session.user}>{children}</MainLayout>
  );
}
