import authedProcedure from "@calcom/trpc/server/procedures/authedProcedure";

import { router } from "../../../trpc";
import { ZApplyJobSchema } from "./applyJob.schema";

type CandidateRouterHandlerCache = {
  applyJob?: typeof import("./applyJob.handler").applyJobHandler;
};

const UNSTABLE_HANDLER_CACHE: CandidateRouterHandlerCache = {};

export const candidateRouter = router({
  applyJob: authedProcedure.input(ZApplyJobSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.applyJob) {
      UNSTABLE_HANDLER_CACHE.applyJob = (await import("./applyJob.handler")).applyJobHandler;
    }

    if (!UNSTABLE_HANDLER_CACHE.applyJob) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.applyJob({ ctx, input });
  }),
});
