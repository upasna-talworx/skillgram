/*
  Warnings:

  - The primary key for the `JobApplicationRound` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `maxScore` on the `JobRound` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('EXCELLENT', 'GOOD', 'AVERAGE', 'BELOW_AVERAGE', 'BAD', 'UNASSIGNED');

-- AlterTable
ALTER TABLE "JobApplicationRound" DROP CONSTRAINT "JobApplicationRound_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "JobApplicationRound_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "JobRound" DROP COLUMN "maxScore",
ALTER COLUMN "roundType" SET DEFAULT 'INTERVIEW';

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobRoundSkill" (
    "roundId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "JobRoundSkill_pkey" PRIMARY KEY ("roundId","skillId")
);

-- CreateTable
CREATE TABLE "SkillRating" (
    "id" SERIAL NOT NULL,
    "skillId" INTEGER NOT NULL,
    "rating" "Rating" NOT NULL DEFAULT 'UNASSIGNED',

    CONSTRAINT "SkillRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplicationRoundSkillRating" (
    "skillRatingId" INTEGER NOT NULL,
    "jobApplicationRoundId" INTEGER NOT NULL,

    CONSTRAINT "JobApplicationRoundSkillRating_pkey" PRIMARY KEY ("skillRatingId","jobApplicationRoundId")
);

-- AddForeignKey
ALTER TABLE "JobRoundSkill" ADD CONSTRAINT "JobRoundSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobRoundSkill" ADD CONSTRAINT "JobRoundSkill_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "JobRound"("roundId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillRating" ADD CONSTRAINT "SkillRating_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationRoundSkillRating" ADD CONSTRAINT "JobApplicationRoundSkillRating_skillRatingId_fkey" FOREIGN KEY ("skillRatingId") REFERENCES "SkillRating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationRoundSkillRating" ADD CONSTRAINT "JobApplicationRoundSkillRating_jobApplicationRoundId_fkey" FOREIGN KEY ("jobApplicationRoundId") REFERENCES "JobApplicationRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
