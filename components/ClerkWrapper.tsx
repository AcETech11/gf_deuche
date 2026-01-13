"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider 
      appearance={{
        // Add luxury Atelier styling while we're at it
        variables: { colorPrimary: '#fbbf24' } 
      }}
    >
      {children}
    </ClerkProvider>
  );
}