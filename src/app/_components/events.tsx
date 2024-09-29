"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/react";
import Link from "next/link";

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

          <div className="mt-2 grid grid-cols-3 gap-4">
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
                  {round.metadata.milestones.enrollment.start} ~{" "}
                  {round.metadata.milestones.enrollment.end}
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
    <p>There are no events yet.</p>
  );
}
