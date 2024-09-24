import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { events } from "@/server/db/schema";
import { asc, desc, gt, lt } from "drizzle-orm";

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
      return await ctx.db
        .select()
        .from(events)
        .where(
          input.cursor
            ? input.order === "asc"
              ? gt(events.id, input.cursor)
              : lt(events.id, input.cursor)
            : undefined,
        )
        .limit(input.limit)
        .orderBy(input.order === "asc" ? asc(events.id) : desc(events.id));
    }),
});
