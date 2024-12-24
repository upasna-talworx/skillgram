import type { GetServerSidePropsContext, NextApiResponse } from "next";

import logger from "@calcom/lib/logger";
import { prisma } from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { TRPCError } from "@trpc/server";

import type { ClientSetupInputSchema } from "./setupClient.schema";

type setupClient = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: ClientSetupInputSchema;
};

export const setupClientHandler = async ({ ctx, input }: setupClient) => {
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
    // Create the Client entry
    await prisma.client.create({
      data: {
        userId: userId.id,
        companyId: input.companyID,
      },
    });

    logger.info(`Client created successfully for user ID ${userId.id} and company Id ${input.companyID}`);
  } catch (e) {
    logger.error(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not create client",
    });
  }
};
