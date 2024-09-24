"use client";

import { api } from "@/trpc/react";

export function LatestEvents() {
  const [query] = api.event.list.useSuspenseInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id,
    },
  );
  const flattened = query.pages.flatMap((page) => page);

  return (
    <div className="w-full max-w-xs">
      {flattened.length ? (
        <ul className="grid gap-4">
          {flattened.map((event) => (
            <li key={event.id} className="rounded-xl bg-white/10 p-4">
              <h3 className="text-lg font-bold">{event.name}</h3>
              <pre className="font-mono text-sm">
                {JSON.stringify(event, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no events yet.</p>
      )}
    </div>
  );
}
