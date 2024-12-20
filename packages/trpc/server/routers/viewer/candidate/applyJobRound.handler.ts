import { prisma } from "@calcom/prisma";

import type { ApplyJobRoundSchema } from "./applyJobRound.schema";

export const applyJobRoundsHandler = async (input: ApplyJobRoundSchema) => {
  // to fetch the round ids
  const roundIds = await prisma.jobRound.findMany({
    where: {
      jobId: input.jobId,
    },
    select: {
      roundId: true,
    },
  });

  // add job application rounds to the table
  for (const round of roundIds) {
    // todo: error handling here
    await prisma.jobApplicationRound.create({
      data: {
        jobId: input.jobId,
        roundId: round.roundId,
        applicationId: input.applicationId,
      },
    });
  }
};
