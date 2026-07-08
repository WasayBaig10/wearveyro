"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
        theme: dark,
        variables: {
          colorPrimary: "#c3f400",
          colorBackground: "#131313",
          borderRadius: "0px",
        },
        elements: {
          card: "border border-white/15 shadow-none",
          headerTitle: "font-label-bold text-lg uppercase tracking-wider",
          headerSubtitle: "text-secondary text-sm",
          socialButtonsBlockButton:
            "border-white/15 text-primary hover:bg-white/5",
          formButtonPrimary:
            "bg-primary-fixed text-on-primary-fixed font-label-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white border border-transparent hover:border-white",
          footerActionLink: "text-primary-fixed hover:text-primary-fixed",
          formFieldLabel: "text-secondary uppercase text-[10px] tracking-wider",
          formFieldInput:
            "bg-[#1e1e1e] border-white/15 text-primary focus:border-primary-fixed",
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
