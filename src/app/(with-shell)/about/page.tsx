import { env } from "@/env";
import { ClientVersion } from "./client-version";

export default async function AboutPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="container flex flex-col items-start justify-center gap-2 px-4 py-16">
        <h1 className="text-4xl font-bold">このサイトについて</h1>
        <pre>Server Version: {env.VERSION ?? "unknown"}</pre>
        <ClientVersion />
      </div>
    </main>
  );
}
