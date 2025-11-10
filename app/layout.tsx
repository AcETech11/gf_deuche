import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
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
  title: "GF Deuche Collection | Luxury Fashion & Urban Style",
  description:
    "Discover GF Deuche Collection — premium urban wear, classy outfits, and timeless fashion pieces for men and women. Shop the latest styles and cash out via WhatsApp.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
  
{ 
  return (
     <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${cormorantGaramond.variable} ${montserrat.variable} antialiased`}
        >
          {children}
          <LiveOrderToasts /> {/* ✅ Moved here as a client component */} 
        </body>
      </html>
    </ClerkProvider>
  );
}
