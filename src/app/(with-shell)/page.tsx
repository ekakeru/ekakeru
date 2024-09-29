import { LatestEvents } from "@/app/_components/events";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-start">
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

      <div className="my-[25vh] flex w-full flex-col items-center justify-center gap-4">
        <div className="animate-in fade-in-0 slide-in-from-bottom-2.5 text-5xl font-bold text-black duration-1000 md:text-7xl dark:text-white">
          イーカケル
        </div>

        <div className="animate-in fade-in-0 slide-in-from-bottom-4 text-muted-foreground text-center text-lg duration-1000">
          みんなのレポートから
          <br />
          チケット当選の透明化
        </div>
      </div>

      <div className="container flex w-full flex-col items-start justify-center gap-4 px-4 pb-16 pt-8">
        <h1 className="mb-8 text-4xl font-bold">イベント一覧</h1>
        <LatestEvents />
      </div>
    </section>
  );
}
