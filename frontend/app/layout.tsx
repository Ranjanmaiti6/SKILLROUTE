import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';

export const metadata: Metadata = {
  title: 'SkillRoute • SAS CU Hackathon 2026 | Data Science Career & Talent Intelligence',
  description: 'Data Science Career, Skill & Leadership Intelligence Platform. Official Submission for SAS Institute & Chandigarh University Hackathon 2026.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-navy min-h-screen antialiased selection:bg-brand-slate selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
