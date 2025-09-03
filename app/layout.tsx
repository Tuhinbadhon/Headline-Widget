import { structuredData, websiteStructuredData } from "@/metadata";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Headline Widget Creator | Modern Typography Tool",
    template: "%s | Headline Widget Creator",
  },
  description:
    "Create stunning, customizable headlines with modern effects, gradients, and animations. Perfect for web designers and developers. Export as JSON or embed code with one click.",
  keywords: [
    "headline creator",
    "typography tool",
    "text effects",
    "gradient generator",
    "web design",
    "font styling",
    "text animation",
    "CSS generator",
    "headline maker",
    "text editor",
    "modern typography",
    "gradient text",
    "web typography",
    "design tool",
    "frontend development",
  ],
  authors: [
    {
      name: "Headline Widget Creator",
      url: "https://headline-widget.vercel.app",
    },
  ],
  creator: "Headline Widget Creator",
  publisher: "Headline Widget Creator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://headline-widget.vercel.app",
    title: "Headline Widget Creator | Modern Typography Tool",
    description:
      "Create stunning, customizable headlines with modern effects, gradients, and animations. Perfect for web designers and developers.",
    siteName: "Headline Widget Creator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Headline Widget Creator - Modern Typography Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Headline Widget Creator | Modern Typography Tool",
    description:
      "Create stunning, customizable headlines with modern effects, gradients, and animations. Perfect for web designers and developers.",
    images: ["/og-image.png"],
    creator: "@headlinewidget",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "Design Tools",
  classification: "Web Development Tool",
  other: {
    "application-name": "Headline Widget Creator",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Headline Creator",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#667eea",
    "msapplication-tap-highlight": "no",
    "theme-color": "#667eea",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
