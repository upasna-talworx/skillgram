import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import type { AddCandidateSchema } from "./addCandidate.schema";

type addCandidateSchema = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: AddCandidateSchema;
};

export const addCandidateHandler = async ({ ctx, input }: addCandidateSchema) => {
  try {
    const application = await prisma.jobApplication.create({
      data: {
        jobId: input.jobId,
        candidateEmail: input.email,
        // cv?
      },
    });
    return { application };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not add Candidate",
    });
  }
};
