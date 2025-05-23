import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const PUBLIC_PATHS = ['/login', '/signup', '/'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Allow public pages
  if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // No token = redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Decode token to access role (sync only, no validation here)
  let role = '';
  try {
    const payload: any = jwt.decode(token);
    role = payload?.role;
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Task creation = only users
  if (req.nextUrl.pathname.startsWith('/tasks') && role !== 'individual') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Skill creation = only providers
  if (req.nextUrl.pathname.startsWith('/skills') && role !== 'company') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}
