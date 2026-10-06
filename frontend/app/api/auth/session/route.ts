import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get('skillroute_session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ user: null, isAuthenticated: false });
  }

  try {
    const user = JSON.parse(sessionCookie);
    return NextResponse.json({ user, isAuthenticated: true });
  } catch {
    return NextResponse.json({ user: null, isAuthenticated: false });
  }
}
