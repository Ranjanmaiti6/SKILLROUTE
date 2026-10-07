import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get('skillroute_session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ user: null, isAuthenticated: false });
  }

  try {
    const user = JSON.parse(sessionCookie);
    if (user && (user.id === 'ranjan_maiti_01' || user.avatar?.includes('photo-1507003211169'))) {
      user.avatar = '/default-avatar.svg';
      user.avatarUrl = '/default-avatar.svg';
    }
    return NextResponse.json({ user, isAuthenticated: true });
  } catch {
    return NextResponse.json({ user: null, isAuthenticated: false });
  }
}
