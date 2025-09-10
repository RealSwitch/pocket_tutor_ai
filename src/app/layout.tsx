import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MainLayout } from '@/components/main-layout';
import { getSession } from './auth/session';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Learnify',
  description: 'A Gamified Learning Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getSession();

  if (!user) {
    // This should not happen for protected routes due to middleware,
    // but it's a good failsafe.
    // It also allows the layout to not render for auth pages.
    // This is a temporary solution before route groups are introduced.
    return (
        <html lang="en">
            <body className="font-body antialiased" suppressHydrationWarning>
                {children}
                <Toaster />
            </body>
        </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <MainLayout user={user}>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
