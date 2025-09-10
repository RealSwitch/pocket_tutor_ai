import { MainLayout } from '@/components/main-layout';
import { getSession } from '@/app/auth/session';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getSession();

  // The middleware should protect all routes in this group,
  // so user should never be null here.
  if (!user) {
    return null; 
  }

  return (
    <MainLayout user={user}>{children}</MainLayout>
  );
}
