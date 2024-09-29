import { headers } from "next/headers";

export default function DebugPage() {
  return (
    <main className="p-4 font-mono">
      <pre>{JSON.stringify(headers(), null, 4)}</pre>
    </main>
  );
}
