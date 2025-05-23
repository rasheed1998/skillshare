import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();  
  const token = cookieStore.get('token')?.value;
  let role = '';

  if (!token) {
    redirect('/login');  
  }

  try {
    const decoded: any = jwt.decode(token || '');
    role = decoded?.role;
  } catch {
    role = '';
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ul className="space-y-2">
          {role === 'individual' && (
            <>
              <li><Link href="/dashboard/user">My Dashboard</Link></li>
              <li><Link href="/dashboard/tasks">Create Task</Link></li>
              <li><Link href="/dashboard/offers">Respond to Offers</Link></li>
            </>
          )}
          {role === 'company' && (
            <>
              <li><Link href="/dashboard/provider">My Dashboard</Link></li>
              <li><Link href="/dashboard/skills">Create Skills</Link></li>
              <li><Link href="/dashboard/offers">Make Offers</Link></li>
            </>
          )}
          <li><Link href="/logout">Logout</Link></li>
        </ul>
      </aside>
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
