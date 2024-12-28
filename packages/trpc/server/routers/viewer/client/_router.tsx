import authedProcedure from "@calcom/trpc/server/procedures/authedProcedure";

import { router } from "../../../trpc";
import { ZAddHiringManagerSchema } from "./addHiringManager.schema";
import { ZConnectTeam } from "./connectTeam.schema";
import { ZCreateJobSchema } from "./createJob.schema";
import { ZCreateJobRoundSchema } from "./createJobRound.schema";
import { ZGetJobSchema } from "./getJob.schema";
import { ZGetJobRoundSchema } from "./getJobRound.schema";

type ClientRouterHandlerCache = {
  listJobs?: typeof import("./listJobs.handler").listJobsHandler;
  createJob?: typeof import("./createJob.handler").createJobHandler;
  createJobRounds?: typeof import("./createJobRound.handler").createJobRoundsHandler;
  getJob?: typeof import("./getJob.handler").getJobHandler;
  // deleteJob?: typeof import("./deleteJob.handler").deleteJobHandler;
  getJobRound?: typeof import("./getJobRound.handler").getJobRoundHandler;
  addHiringManager?: typeof import("./addHiringManager.handler").addHiringManagerHandler;
  connectTeam?: typeof import("./connectTeam.handler").connectTeamHandler;
};

const UNSTABLE_HANDLER_CACHE: ClientRouterHandlerCache = {};

export const clientRouter = router({
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
  getJob: authedProcedure.input(ZGetJobSchema).query(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.getJob) {
      UNSTABLE_HANDLER_CACHE.getJob = (await import("./getJob.handler")).getJobHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.getJob) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.getJob({ ctx, input });
  }),
  // deleteJob: authedProcedure.input(ZDeleteJobSchema).mutation(async ({ ctx, input }) => {

  // }),
  getJobRound: authedProcedure.input(ZGetJobRoundSchema).query(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.getJobRound) {
      UNSTABLE_HANDLER_CACHE.getJobRound = (await import("./getJobRound.handler")).getJobRoundHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.getJobRound) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.getJobRound({ ctx, input });
  }),
  addHiringManager: authedProcedure.input(ZAddHiringManagerSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addHiringManager) {
      UNSTABLE_HANDLER_CACHE.addHiringManager = (
        await import("./addHiringManager.handler")
      ).addHiringManagerHandler;
    }

    if (!UNSTABLE_HANDLER_CACHE.addHiringManager) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addHiringManager({ ctx, input });
  }),
  connectTeam: authedProcedure.input(ZConnectTeam).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.connectTeam) {
      UNSTABLE_HANDLER_CACHE.connectTeam = (await import("./connectTeam.handler")).connectTeamHandler;
    }

    if (!UNSTABLE_HANDLER_CACHE.connectTeam) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.connectTeam({ ctx, input });
  }),
  getAllSkills: authedProcedure.query(async () => {
    if (!UNSTABLE_HANDLER_CACHE.getAllSkills) {
      UNSTABLE_HANDLER_CACHE.getAllSkills = (await import("./getAllSkills.handler")).getAllSkillsHandler;
    }

    if (!UNSTABLE_HANDLER_CACHE.getAllSkills) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.getAllSkills();
  }),
});
