-- DropForeignKey
ALTER TABLE "JobRound" DROP CONSTRAINT "JobRound_jobId_fkey";

-- AlterTable
ALTER TABLE "JobRound" ADD COLUMN     "teamId" INTEGER;

-- AddForeignKey
ALTER TABLE "JobRound" ADD CONSTRAINT "JobRound_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobRound" ADD CONSTRAINT "JobRound_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE CASCADE ON UPDATE CASCADE;
