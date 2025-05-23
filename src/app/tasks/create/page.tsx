// SSR page to render task creation
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CreateTaskForm from './form';

export default async function CreateTaskPage() {
   
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) redirect('/login');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const categories = await res.json();

  return <CreateTaskForm categories={categories} token={token} />;
}
