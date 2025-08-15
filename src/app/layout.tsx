import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
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
  title: "The Indian Startup - Launch Your Startup in 30 Days",
  description: "Step-by-step India-specific playbooks for founders who want to move fast. From incorporation to funding to revenue.",
  keywords: "startup india, startup registration, india startup scheme, startup funding india",
  authors: [{ name: "The Indian Startup" }],
  openGraph: {
    title: "The Indian Startup - Launch Your Startup in 30 Days",
    description: "Step-by-step India-specific playbooks for founders who want to move fast.",
    url: "https://theindianstartup.in",
    siteName: "The Indian Startup",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Indian Startup - Launch Your Startup in 30 Days",
    description: "Step-by-step India-specific playbooks for founders who want to move fast.",
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
      </body>
    </html>
  );
}