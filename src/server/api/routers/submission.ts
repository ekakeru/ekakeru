import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { submissions } from "@/server/db/schema";

export const submissionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ enrollmentRoundId: z.string(), payload: z.any() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(submissions).values({
        createdById: ctx.session.user.id,
        enrollmentRoundId: input.enrollmentRoundId,
        trustworthiness: 100,
        trustworthyPostures: {},
        payload: input.payload,
      });
    }),
});
