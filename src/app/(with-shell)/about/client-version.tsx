"use client";

export function ClientVersion() {
  return (
    <pre>Client Version: {process.env.NEXT_PUBLIC_VERSION ?? "unknown"}</pre>
  );
}
