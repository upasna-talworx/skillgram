import type { GetServerSidePropsContext, NextApiResponse } from "next";

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

  // client left
  console.log(input);

  return;
};
