/*
  Warnings:

  - You are about to drop the column `companyName` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the `JobApplicationRoundSkillRating` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobApplicationRoundId` to the `SkillRating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobApplicationRoundSkillRating" DROP CONSTRAINT "JobApplicationRoundSkillRating_jobApplicationRoundId_fkey";

-- DropForeignKey
ALTER TABLE "JobApplicationRoundSkillRating" DROP CONSTRAINT "JobApplicationRoundSkillRating_skillRatingId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SkillRating" ADD COLUMN     "jobApplicationRoundId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "JobApplicationRoundSkillRating";

-- AddForeignKey
ALTER TABLE "SkillRating" ADD CONSTRAINT "SkillRating_jobApplicationRoundId_fkey" FOREIGN KEY ("jobApplicationRoundId") REFERENCES "JobApplicationRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
