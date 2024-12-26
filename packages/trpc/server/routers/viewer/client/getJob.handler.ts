import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";

import { TRPCError } from "@trpc/server";

import type { TrpcSessionUser } from "../../../trpc";
import type { GetJobSchema } from "./getJob.schema";

type getJobInput = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: GetJobSchema;
};

export const getJobHandler = async ({ ctx, input }: getJobInput) => {
  const jobId = input.jobId;
  try {
    const job = await prisma.job.findUnique({
      where: {
        jobId: jobId,
      },
      select: {
        jobTitle: true,
      },
    });
    return { job };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not fetch job(s)",
    });
  }
};
