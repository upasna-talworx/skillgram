import authedProcedure from "@calcom/trpc/server/procedures/authedProcedure";

import { router } from "../../../trpc";
import { ZCreateJobSchema } from "./createJob.schema";
import { ZCreateJobRoundSchema } from "./createJobRound.schema";

type AdminRouterHandlerCache = {
  listJobs?: typeof import("./listJobs.handler").listJobsHandler;
  createJob?: typeof import("./createJob.handler").createJobHandler;
  createJobRounds?: typeof import("./createJobRound.handler").createJobRoundsHandler;
  // addHiringManager?: typeof import("./addHiringManager.handler").addHiringManagerHandler
};

const UNSTABLE_HANDLER_CACHE: AdminRouterHandlerCache = {};

export const _adminRouter = router({
  createJob: authedProcedure.input(ZCreateJobSchema).mutation(async ({ ctx, input }) => {
    console.log("TOUCHED THE ROUTE");
    if (!UNSTABLE_HANDLER_CACHE.createJob) {
      UNSTABLE_HANDLER_CACHE.createJob = (await import("./createJob.handler")).createJobHandler;
    }

    if (!UNSTABLE_HANDLER_CACHE.createJob) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.createJob({ ctx, input });
  }),
  listJobs: authedProcedure.query(async ({ ctx }) => {
    if (!UNSTABLE_HANDLER_CACHE.listJobs) {
      UNSTABLE_HANDLER_CACHE.listJobs = (await import("./listJobs.handler")).listJobsHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.listJobs) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.listJobs({ ctx });
  }),
  createJobRounds: authedProcedure.input(ZCreateJobRoundSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.createJobRounds) {
      UNSTABLE_HANDLER_CACHE.createJobRounds = (
        await import("./createJobRound.handler")
      ).createJobRoundsHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.createJobRounds) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.createJobRounds({ ctx, input });
  }),
  // addHiringManager: authedProcedure.input(ZAddHiringManagerSchema).mutation(async ({ ctx, input }) => {
  //     if (!UNSTABLE_HANDLER_CACHE.addHiringManager) {
  //         UNSTABLE_HANDLER_CACHE.addHiringManager = (await import("./addHiringManager.handler")).addHiringManagerHandler
  //     }

  //     if (!UNSTABLE_HANDLER_CACHE.addHiringManager){
  //         throw new Error("Failed to load handler")
  //     }

  //     return UNSTABLE_HANDLER_CACHE.addHiringManager({ ctx, input })
  // }),
});
