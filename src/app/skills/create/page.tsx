import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CreateSkillForm from './form';

export default async function CreateSkillPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) redirect('/login');

  // Optionally verify role here if backend supports /me or /auth/profile
  return <CreateSkillForm token={token} />;
}
