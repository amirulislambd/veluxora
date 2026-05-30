import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Sheared/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Sheared/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "VELUXORA | Luxury & High-Performance Car Rental",
    template: "%s | VELUXORA",
  },
  description:
    "Drive beyond ordinary. Experience the pinnacle of automotive engineering with Veluxora's curated collection of high-performance vehicles.",
  keywords: [
    "Luxury Car Rental",
    "Supercar Hire",
    "Veluxora Rent",
    "Exotic Car Rental",
    "Rent Lamborghini",
    "Ferrari Rental",
  ],
  authors: [{ name: "M. Amirul Islam" }],
  metadataBase: new URL("https://veluxora.vercel.app"),
  openGraph: {
    title: "VELUXORA | Premium Luxury Car Rental Ecosystem",
    description:
      "Drive beyond ordinary. Experience luxury fleet management and rentals tailored for the discerning driver.",
    url: "https://veluxora.vercel.app",
    siteName: "Veluxora",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Veluxora Premium Fleet",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "VELUXORA | Luxury Car Rental",
    description:
      "Experience high-performance vehicle management and premium rentals.",
    images: ["/og-image.jpg"],
  },

  verification: {
    google: "hqLUcA89yMna2GmB8rYnhUhqAWUXBjhAaL4FrLEwQaI",
  },
  alternates: {
    canonical: "https://veluxora.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://veluxora.vercel.app/#organization",
      name: "Veluxora",
      url: "https://veluxora.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://veluxora.vercel.app/og-image.jpg",
      },
      description:
        "Drive beyond ordinary. Experience the pinnacle of automotive engineering with Veluxora's curated collection of high-performance vehicles.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://veluxora.vercel.app/#website",
      url: "https://veluxora.vercel.app",
      name: "VELUXORA",
      description: "Luxury & High-Performance Car Rental",
      publisher: {
        "@id": "https://veluxora.vercel.app/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://veluxora.vercel.app/exploreCars?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="pt-[72px]">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
