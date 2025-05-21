import { AuthProvider } from '../../contexts/AuthContext';
import Header from './components/Header';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skillshare',
  description: 'Marketplace for sharing skills',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider><Header/>{children}</AuthProvider>
      </body>
    </html>
  );
}