declare global {
  interface Window {
    google?: any;
  }
}

export interface GoogleUserProfile {
  sub: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture: string;
  email: string;
  email_verified: boolean;
  accessToken?: string;
}

const GSI_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

export function loadGoogleGsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve();

    if (window.google?.accounts) {
      return resolve();
    }

    const existingScript = document.querySelector(`script[src="${GSI_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.src = GSI_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(new Error('Failed to load Google Identity Services SDK'));
    document.head.appendChild(script);
  });
}

export function getStoredGoogleClientId(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  }
  return (
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    localStorage.getItem('skillroute_google_client_id') ||
    ''
  );
}

export function saveGoogleClientId(clientId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('skillroute_google_client_id', clientId.trim());
  }
}

export async function promptGoogleOAuth(clientId: string): Promise<GoogleUserProfile> {
  await loadGoogleGsiScript();

  if (!window.google?.accounts?.oauth2) {
    throw new Error('Google Identity Services library is unavailable.');
  }

  return new Promise((resolve, reject) => {
    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        prompt: 'select_account',
        callback: async (tokenResponse: any) => {
          if (tokenResponse.error) {
            reject(new Error(tokenResponse.error_description || tokenResponse.error));
            return;
          }

          try {
            // Fetch authentic user profile from Google's UserInfo API
            const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            });

            if (!userInfoRes.ok) {
              throw new Error('Failed to fetch user profile from Google');
            }

            const profile: GoogleUserProfile = await userInfoRes.json();
            profile.accessToken = tokenResponse.access_token;
            resolve(profile);
          } catch (fetchErr) {
            reject(fetchErr);
          }
        },
      });

      tokenClient.requestAccessToken({ prompt: 'select_account' });
    } catch (err) {
      reject(err);
    }
  });
}
