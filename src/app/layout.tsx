import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AnimatedBackground from '@/components/animated-background';
import FloatingActionButton from '@/components/floating-action-button'; // Placeholder for FAB

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'USDA.money - Backed. Stable. Trusted.',
  description: 'The futuristic, high-performance stablecoin. Decentralized, collateralized, and built for the future of finance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background`}>
        <AnimatedBackground />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Ensure dark mode is default
          enableSystem={false} // Explicitly disable system if dark is always default
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow relative z-10">{children}</main>
          <Footer />
          <FloatingActionButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
