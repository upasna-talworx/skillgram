import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import { addHiringManagerHandler } from "./addHiringManager.handler";
import type { CreateJobSchema } from "./createJob.schema";

type createJobInput = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: CreateJobSchema;
};

export const createJobHandler = async ({ ctx, input }: createJobInput) => {
  const { user } = ctx;
  console.log("THIS IS CONTEXT", ctx);
  console.log("THIS IS INPUT", input);
  // add job to database
  try {
    const job = await prisma.job.create({
      data: {
        jobDescription: input.jobDescription,
        yearsOfExperience: input.yearsOfExperience,
        jobTitle: input.jobTitle,
        skillsRequired: input.skillsRequired,
      },
    });

    // rounds no longer taken input with creation of job
    // const jobRounds = createJobRoundsHandler({jobId: job.jobId, rounds: input.rounds})

    const hiringManagers = addHiringManagerHandler({ input: input.hiringManagers });

    // add (job, client) to JobClient relation
    const clientId = user.id;
    await prisma.jobClient.create({
      data: {
        jobId: job.jobId,
        clientId: clientId,
      },
    });

    return { job };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not create Job",
    });
  }
};
