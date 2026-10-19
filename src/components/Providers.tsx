"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import AuthSync from "./AuthSync";
import type { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#90a1b9",
          colorBackground: "#ffffff",
          borderRadius: "0px",
        },
        elements: {
          card: "border border-black/15 shadow-none",
          headerTitle: "font-label-bold text-lg uppercase tracking-wider text-primary",
          headerSubtitle: "text-secondary text-sm",
          socialButtonsBlockButton:
            "border-black/15 text-primary hover:bg-black/5",
          formButtonPrimary:
            "bg-primary-fixed text-on-primary-fixed font-label-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white border border-transparent hover:border-black",
          footerActionLink: "text-primary-fixed hover:text-primary-fixed",
          formFieldLabel: "text-secondary uppercase text-[10px] tracking-wider",
          formFieldInput:
            "bg-surface border-black/15 text-primary focus:border-primary-fixed",
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AuthSync>
          {children}
        </AuthSync>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
