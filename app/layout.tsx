import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ClerkWrapper from "@/components/ClerkWrapper";
import LiveOrderToasts from "@/components/LiveOrderToasts";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorantGaramond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production" 
    ? "https://gfdeuchecollection.vercel.app" // Update this once you buy your domain
    : "http://localhost:3000"
  ),
  title: {
    default: "GF Deuche Collection | Luxury Fashion & Urban Style",
    template: "%s | GF Deuche" // This allows sub-pages to be "Search | GF Deuche"
  },
  description:
    "Discover GF Deuche Collection — premium urban wear, classy outfits, and timeless fashion pieces for men and women. Shop the latest styles and acquire via WhatsApp.",
  keywords: ["Luxury Fashion", "Urban Wear Nigeria", "Atelier Collection", "Premium Outfits"],
  authors: [{ name: "GF Deuche" }],
  openGraph: {
    title: "GF Deuche Collection",
    description: "Premium urban wear and timeless fashion pieces.",
    url: "https://gfdeuche.com", // Replace with your actual domain
    siteName: "GF Deuche",
    images: [
      {
        url: "/og-image.jpg", // Create a 1200x630 image in your /public folder
        width: 1200,
        height: 630,
        alt: "GF Deuche Luxury Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GF Deuche Collection",
    description: "Premium urban wear and timeless fashion pieces.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
  
{ 
  return (
     <ClerkWrapper>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${cormorantGaramond.variable} ${montserrat.variable} antialiased`}
        >
          {children}
          <LiveOrderToasts /> {/* ✅ Moved here as a client component */} 
        </body>
      </html>
    </ClerkWrapper>
  );
}
