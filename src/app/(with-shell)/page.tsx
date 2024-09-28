import { LatestEvents } from "@/app/_components/events";

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="container flex flex-col items-start justify-center gap-12 px-4 py-16">
        <h1 className="text-4xl font-bold">イベント一覧</h1>
        <LatestEvents />
      </div>
    </main>
  );
}
