export const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Headline Widget Creator",
  description:
    "Create stunning, customizable headlines with modern effects, gradients, and animations. Perfect for web designers and developers.",
  url: "https://headline-widget-creator.vercel.app",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Organization",
    name: "Headline Widget Creator",
  },
  publisher: {
    "@type": "Organization",
    name: "Headline Widget Creator",
  },
  image: "https://headline-widget-creator.vercel.app/og-image.png",
  screenshot: "https://headline-widget-creator.vercel.app/screenshot-wide.png",
  softwareVersion: "1.0.0",
  datePublished: "2025-09-03",
  dateModified: "2025-09-03",
  features: [
    "Typography customization",
    "Gradient effects",
    "Text animations",
    "Word-level styling",
    "Export functionality",
    "Real-time preview",
    "Modern effects",
  ],
  browserRequirements: "Requires modern web browser with JavaScript enabled",
  downloadUrl: "https://headline-widget-creator.vercel.app",
  installUrl: "https://headline-widget-creator.vercel.app",
};

export const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://headline-widget-creator.vercel.app",
    },
  ],
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Headline Widget Creator",
  url: "https://headline-widget-creator.vercel.app",
  description:
    "Create stunning, customizable headlines with modern effects, gradients, and animations",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://headline-widget-creator.vercel.app?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};
