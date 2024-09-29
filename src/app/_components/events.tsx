"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TimeRange } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useRef } from "react";

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

export function LatestEvents() {
  const [query] = api.event.list.useSuspenseInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id,
    },
  );
  const flattened = query.pages.flatMap((page) => page);

  return flattened.length ? (
    <ul className="grid gap-6">
      {flattened.map((event) => (
        <li key={event.id} className="flex flex-col items-start gap-4">
          <h2 className="text-2xl font-bold">{event.name}</h2>
          <h3 className="text-lg font-bold">{event.metadata.location}</h3>

          <div className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {event.enrollmentRounds.map((round) => (
              <Card
                key={round.id}
                className="flex w-full flex-col items-start rounded border p-6"
              >
                <div className="text-lg font-bold">{round.name}</div>
                <div className="font-mono text-sm text-text">
                  {round.platform}
                </div>
                <div className="mt-2 text-sm">
                  <TimeRange timeRange={round.metadata.milestones.enrollment} />
                </div>

                <div className="mt-4 flex items-center justify-start gap-2">
                  <Button variant="default" asChild>
                    <Link
                      href={`/events/${event.id}/rounds/${round.id}/submission/create`}
                    >
                      Start submission
                    </Link>
                  </Button>

                  <Button variant="secondary" asChild>
                    <Link href={`/events/${event.id}/rounds/${round.id}`}>
                      Learn more
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <p>{event.metadata.description}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>ただいま、イベントはありません。</p>
  );
}
