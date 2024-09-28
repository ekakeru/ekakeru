"use client";

import { api } from "@/trpc/react";
import { Button, Group, Paper } from "@mantine/core";
import Link from "next/link";

export function LatestEvents() {
  const [query] = api.event.list.useSuspenseInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id,
    },
  );
  const flattened = query.pages.flatMap((page) => page);

  return (
    <div className="size-full">
      {flattened.length ? (
        <ul className="grid gap-md">
          {flattened.map((event) => (
            <li key={event.id} className="flex flex-col items-start gap-sm">
              <h2 className="text-2xl font-bold">{event.name}</h2>
              <h3 className="text-lg font-bold">{event.metadata.location}</h3>

              <Group mt="md" className="grid grid-cols-3 gap-sm">
                {event.enrollmentRounds.map((round) => (
                  <Paper
                    withBorder
                    key={round.id}
                    className="flex w-full flex-col items-start p-md"
                  >
                    <div className="text-lg font-bold">{round.name}</div>
                    <div className="font-mono text-sm text-text">
                      {round.platform}
                    </div>
                    <div className="mt-2 text-sm">
                      {round.metadata.milestones.enrollment.start} ~{" "}
                      {round.metadata.milestones.enrollment.end}
                    </div>

                    <div className="mt-sm flex items-center justify-start gap-xs">
                      <Button
                        variant="filled"
                        component={Link}
                        href={`/events/${event.id}/rounds/${round.id}/submission/create`}
                      >
                        Start submission
                      </Button>

                      <Button
                        color="gray"
                        variant="light"
                        component={Link}
                        href={`/events/${event.id}/rounds/${round.id}`}
                      >
                        Learn more
                      </Button>
                    </div>
                  </Paper>
                ))}
              </Group>

              <p>{event.metadata.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no events yet.</p>
      )}
    </div>
  );
}
