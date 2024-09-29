import { LatestEvents } from "@/app/_components/events";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <section className="relative flex h-full flex-col items-center justify-start">
      <GridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "fixed inset-0 skew-y-12",
        )}
      />

      <div className="container flex flex-col items-start justify-center gap-4 px-4 pb-16 pt-8">
        <h1 className="mb-8 text-4xl font-bold">イベント一覧</h1>
        <LatestEvents />
      </div>
    </section>
  );
}
