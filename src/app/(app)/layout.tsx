import 'server-only'
import { MainLayout } from '@/components/main-layout';
import { getSession, type User } from '@/app/auth/session';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getSession();
  
  // The middleware should handle redirects, so user should not be null here.
  if (!session?.isLoggedIn || !session.user) {
    // This can be null in a theoretical case, but middleware makes it unlikely
    return null;
  }

  return (
    <MainLayout user={session.user as User}>{children}</MainLayout>
  );
}
