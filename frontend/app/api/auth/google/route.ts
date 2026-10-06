import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = process.env.NEXTAUTH_URL || req.nextUrl.origin || 'http://localhost:3000';
  const redirectUri = process.env.AUTH_REDIRECT_URI || `${baseUrl}/api/auth/callback/google`;

  // Check if real Google credentials are configured
  if (!clientId || clientId.includes('your-google-client-id') || !clientSecret || clientSecret.includes('your-google-client-secret')) {
    return NextResponse.redirect(new URL('/login?error=missing_credentials', req.url));
  }

  // Generate cryptographic state for CSRF protection
  const state = crypto.randomBytes(24).toString('hex');

  // Build authentic Google OAuth 2.0 / OpenID Connect Authorization URL
  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', clientId);
  googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', 'openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email');
  googleAuthUrl.searchParams.set('state', state);
  googleAuthUrl.searchParams.set('access_type', 'offline');
  googleAuthUrl.searchParams.set('prompt', 'select_account');

  const response = NextResponse.redirect(googleAuthUrl.toString());

  // Store state in secure cookie for CSRF validation
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10, // 10 minutes
    path: '/',
  });

  return response;
}
