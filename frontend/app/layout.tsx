import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';

export const metadata: Metadata = {
  title: 'SkillRoute • Skill-to-Opportunity Transition Intelligence',
  description: 'Turn your current capabilities into an evidence-backed transition plan. Build For Bharat 2.0 • Team ELITECORE.',
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
