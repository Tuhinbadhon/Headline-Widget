import type { Metadata } from "next";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://headline-widget.vercel.app"),
  title: {
    default: "Headline Widget Creator | Modern Typography Tool",
    template: "%s | Headline Widget Creator",
  },
  description:
    "Create stunning, customizable headlines with modern effects, gradients, and animations. Perfect for web designers and developers.",
  keywords: [
    "headline creator",
    "typography tool",
    "text effects",
    "gradient text",
    "web design",
    "font styling",
    "text animation",
    "modern typography",
    "headline generator",
    "text design tool",
  ],
  authors: [{ name: "Headline Widget Creator" }],
  creator: "Headline Widget Creator",
  publisher: "Headline Widget Creator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
      {
        url: "/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "Headline Widget Creator - Create Beautiful Headlines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Headline Widget Creator | Modern Typography Tool",
    description:
      "Create stunning, customizable headlines with modern effects, gradients, and animations. Perfect for web designers and developers.",
    images: ["/twitter-image.png"],
    creator: "@headlinewidget",
  },
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: "https://headline-widget.vercel.app",
  },
  category: "technology",
  classification: "Design Tool",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Headline Creator",
    "application-name": "Headline Widget Creator",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#000000",
  },
};
