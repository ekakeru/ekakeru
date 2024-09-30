"use client";

import { env } from "@/env";

export function ClientVersion() {
  return <pre>Client Version: {env.NEXT_PUBLIC_VERSION ?? "unknown"}</pre>;
}
