import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { eventEnrollmentRounds, events } from "@/server/db/schema";
import { asc, desc, eq, gt, lt } from "drizzle-orm";

type ListEventsOutput = typeof events.$inferSelect & {
  enrollmentRounds: (typeof eventEnrollmentRounds.$inferSelect)[];
};

export const eventRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().int().max(100).positive().default(20),
        cursor: z.string().nullish(),
        order: z.enum(["asc", "desc"]).default("desc"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db
        .select()
        .from(events)
        .innerJoin(
          eventEnrollmentRounds,
          eq(events.id, eventEnrollmentRounds.eventId),
        )
        .where(
          input.cursor
            ? input.order === "asc"
              ? gt(events.id, input.cursor)
              : lt(events.id, input.cursor)
            : undefined,
        )
        .limit(input.limit)
        .orderBy(input.order === "asc" ? asc(events.id) : desc(events.id));

      return rows.reduce<ListEventsOutput[]>((acc, row) => {
        const event = acc.find((e) => e.id === row.events.id);
        if (event) {
          event.enrollmentRounds.push(row.event_enrollment_rounds);
        } else {
          acc.push({
            ...row.events,
            enrollmentRounds: [row.event_enrollment_rounds],
          });
        }
        return acc;
      }, [] as ListEventsOutput[]);
    }),
});
