import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default async function DashboardRedirect() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let role = '';
  try {
    const decoded: any = jwt.decode(token);
    role = decoded?.role;
  } catch (err) {
    redirect('/login');
  }

  if (role === 'individual') {
    redirect('/dashboard/user');
  } else if (role === 'company') {
    redirect('/dashboard/provider');
  } else {
    redirect('/unauthorized');
  }
}
