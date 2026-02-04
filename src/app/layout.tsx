import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { PostHogProvider } from '@/components/providers/PostHogProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { FeedbackWidget } from '@/components/ui/FeedbackWidget';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Toaster } from 'sonner';
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Performance: use fallback font while loading
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: 'swap', // Performance: use fallback font while loading
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://theindianstartup.in'),
  title: {
    default: "The Indian Startup - Launch Your Startup in 30 Days",
    template: "%s | The Indian Startup"
  },
  description: "Join 30-Day India Launch Sprint - the only startup program designed specifically for Indian founders. Get from idea to launch-ready with expert guidance, templates, and community support.",
  keywords: [
    "startup india",
    "startup registration india", 
    "india startup scheme",
    "startup funding india",
    "dpiit registration",
    "startup india certificate",
    "indian startup ecosystem",
    "startup incorporation india",
    "startup legal compliance india",
    "indian startup community",
    "30 day startup challenge",
    "startup mentor india",
    "startup course india",
    "entrepreneur india"
  ],
  authors: [{ name: "The Indian Startup", url: "https://theindianstartup.in" }],
  creator: "The Indian Startup",
  publisher: "The Indian Startup",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://theindianstartup.in",
    siteName: "The Indian Startup",
    title: "The Indian Startup - Launch Your Startup in 30 Days",
    description: "Join 30-Day India Launch Sprint - the only startup program designed specifically for Indian founders. Get from idea to launch-ready with expert guidance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Indian Startup - 30-Day India Launch Sprint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theindianstartup",
    creator: "@theindianstartup",
    title: "The Indian Startup - Launch Your Startup in 30 Days",
    description: "Join 30-Day India Launch Sprint - the only startup program designed specifically for Indian founders.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "business",
  classification: "startup education",
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <ErrorBoundary level="page" showDetails={process.env.NODE_ENV === 'development'}>
          <AuthProvider>
            <CartProvider>
              <PostHogProvider>
                <MobileNav />
                <div className="lg:ml-0 pb-16 lg:pb-0">
                  {children}
                </div>
                <FeedbackWidget />
                <Toaster richColors position="top-center" />
              </PostHogProvider>
            </CartProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}