import 'server-only'
import { MainLayout } from '@/components/main-layout';
import { getSession, type User } from '@/app/auth/session';
import { redirect } from 'next/navigation';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getSession();
  
  if (!session?.isLoggedIn || !session.user) {
    redirect('/login');
  }

  return (
    <MainLayout user={session.user as User}>{children}</MainLayout>
  );
}
