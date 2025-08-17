import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { FeedbackWidget } from '@/components/ui';
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
        <ErrorBoundary showErrorDetails={process.env.NODE_ENV === 'development'}>
          <AuthProvider>
            <PostHogProvider>
              {children}
              <FeedbackWidget />
            </PostHogProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}