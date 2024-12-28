import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import type { ListCandidateSchema } from "./listCandidates.schema";

type listCandidateSchema = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: ListCandidateSchema;
};

export const listCandidateHandler = async ({ ctx, input }: listCandidateSchema) => {
  try {
    const candidates = await prisma.jobApplication.findMany({
      where: {
        jobId: input.jobId,
      },
      select: {
        candidateId: true,
        candidateEmail: true,
        status: true,
        verdict: true,
      },
    });
    return { candidates };
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Your request could not be processed",
    });
  }
};
