import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default function ProviderDashboard() {
  const token = cookies().get('token')?.value;
  let email = '', id = '', role = '';

  try {
    const decoded: any = jwt.decode(token || '');
    email = decoded?.email;
    id = decoded?.sub;
    role = decoded?.role;
  } catch {
    // fallback
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome, Provider</h1>
      <p>🆔 ID: {id}</p>
      <p>📧 Email: {email}</p>
      <p>🔐 Role: {role}</p>
    </div>
  );
}
