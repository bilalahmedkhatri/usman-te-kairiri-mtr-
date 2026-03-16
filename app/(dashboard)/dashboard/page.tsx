import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { getDashboardRoute } from '@/lib/permissions';

/**
 * Main dashboard page that redirects to role-specific dashboards
 */
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const userRole = session.user.role as UserRole;
  const dashboardRoute = getDashboardRoute(userRole);

  redirect(dashboardRoute);
}