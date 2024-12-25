import type { GetServerSidePropsContext, NextApiResponse } from "next";

import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import type { CandidateSetupInputSchema } from "./setupCandidate.schema";

type setupCandidate = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: CandidateSetupInputSchema;
};

export const setupCandidateHandler = async ({ ctx, input }: setupCandidate) => {
  const { user } = ctx;
  const email = user.email;

  const userId = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  if (!userId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `User with email '${email}' not found.`,
    });
    return;
  }

  try {
    await prisma.candidate.create({
      data: {
        userId: userId.id,
        name: input.name,
        image: input.image,
        bio: input.bio,
        resume: input.resume,
      },
    });
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not create admin",
    });
    return;
  }
  // return ?
};
