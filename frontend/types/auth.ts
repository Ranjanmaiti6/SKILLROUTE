export interface UserSession {
  id: string;
  googleSubjectId?: string | null;
  name: string;
  email: string;
  avatarUrl?: string | null;
  avatar?: string | null;
  emailVerified?: boolean;
  role: string;
  provider: 'google' | 'github' | 'email' | 'demo';
  experience_years?: number;
  location?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role?: string;
  experience_years?: number;
  location?: string;
}

export interface GoogleAuthPayload {
  credential?: string;
  access_token?: string;
  code?: string;
  email?: string;
  name?: string;
  avatar?: string;
}
