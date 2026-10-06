import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  response.cookies.delete('skillroute_session');
  response.cookies.delete('oauth_state');
  return response;
}
