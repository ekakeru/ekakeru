"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type ListEventsOutput } from "@/server/api/routers/event";
import type { TimeRange } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useRef } from "react";
import MdiLocation from "~icons/mdi/location";
import MdiTextLong from "~icons/mdi/text-long";

// LoadMorePresenceListener listens if itself is in the viewport
// and calls onShouldLoadMore if it is. It should ensure it is only called once,
// as new instances will be created when new pages are loaded.
function LoadMorePresenceListener({
  onShouldLoadMore,
}: {
  onShouldLoadMore: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onShouldLoadMore();
            }
          });
        },
        {
          root: null,
          threshold: 0.5,
        },
      );

      observer.observe(element);
    }
  }, [onShouldLoadMore]);

  return <div ref={ref} />;
}

function TimeRange({ timeRange }: { timeRange: TimeRange }) {
  const start = new TZDate(timeRange.start, "Asia/Tokyo");
  const end = new TZDate(timeRange.end, "Asia/Tokyo");

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear !== endYear) {
    return (
      <>
        <Date date={start}>{format(start, "yyyy-MM-dd HH:mm")}</Date>
        <span>~</span>
        <Date date={end}>{format(end, "yyyy-MM-dd HH:mm")}</Date>
      </>
    );
  } else {
    return (
      <>
        <Date date={start}>{format(start, "MM-dd HH:mm")}</Date>
        <span> ~ </span>
        <Date date={end}>{format(end, "MM-dd HH:mm")}</Date>
      </>
    );
  }
}

function Date({ date, children }: { date: Date; children: React.ReactNode }) {
  return <time dateTime={date.toISOString()}>{children}</time>;
}

function EventCard({ event }: { event: ListEventsOutput }) {
  return (
    <Card key={event.id} className="flex flex-col items-start gap-2 p-4">
      <h2 className="text-2xl font-bold">{event.name}</h2>

      <div className="flex items-center gap-2">
        <MdiLocation className="inline-block opacity-50" />
        <p>{event.metadata.location}</p>
      </div>

      <div className="flex items-center gap-2">
        <MdiTextLong className="inline-block opacity-50" />
        <p>{event.metadata.description}</p>
      </div>

      <h3 className="mt-4 text-lg font-bold">抽選申込の結果</h3>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {event.enrollmentRounds.map((round) => (
          <Card
            key={round.id}
            className="flex w-full flex-col items-start gap-1 rounded border p-4"
          >
            <div className="flex w-full flex-wrap items-center">
              <div className="text-lg font-bold">{round.name}</div>
              <div className="flex-1" />
              <div className="font-mono text-sm text-muted-foreground">
                {round.platform}
              </div>
            </div>

            <div className="text-sm">
              <TimeRange timeRange={round.metadata.milestones.enrollment} />
            </div>

            <div className="mt-2 flex items-center justify-start gap-2">
              <Button variant="default" asChild>
                <Link
                  href={`/events/${event.id}/rounds/${round.id}/submission/create`}
                >
                  報告する
                </Link>
              </Button>

              <Button variant="secondary" asChild>
                <Link href={`/events/${event.id}/rounds/${round.id}`}>
                  結果を見る
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

export function LatestEvents() {
  const [query] = api.event.list.useSuspenseInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id,
    },
  );
  const flattened = query.pages.flatMap((page) => page);

  return flattened.length ? (
    <div className="flex min-h-[80vh] w-full flex-col gap-6">
      {flattened.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  ) : (
    <p>ただいま、イベントはありません。</p>
  );
}
