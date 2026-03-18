import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from './layout-client';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  try {
    const session = await auth();
    // console.log('🔍 Dashboard Layout: Session result:', session ? 'EXISTS' : 'NULL');

    // if (session) {
    //   console.log('🔍 Dashboard Layout: Session user:', session.user?.email);
    // }

    if (!session) {
      console.log('❌ Dashboard Layout: No session found, redirecting to login');
      redirect('/login');
    }

    // console.log('✅ Dashboard Layout: Session valid, rendering dashboard');
    return (
      <DashboardLayoutClient session={session}>
        {children}
      </DashboardLayoutClient>
    );
  } catch (error) {
    console.error('💥 Dashboard Layout: Error during session check:', error);
    redirect('/login');
  }
}