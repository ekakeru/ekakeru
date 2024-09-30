// app/providers.tsx
"use client";

import { env } from "@/env";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/_carrier/seele",
    ui_host: "https://us.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
