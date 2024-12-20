-- CreateEnum
CREATE TYPE "RoundType" AS ENUM ('QUIZ', 'INTERVIEW', 'RESUME_UPLOAD', 'AI_INTERVIEW', 'OTHER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_APPLICABLE', 'EMAIL_SENT', 'ACCOUNT_CREATED', 'IN_PROCESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Verdict" AS ENUM ('NOT_APPLICABLE', 'STRONG_HIRE', 'HIRE', 'WEAK_HIRE', 'NO_HIRE', 'IN_PROCESS');

-- AlterTable
ALTER TABLE "EventType" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Job" (
    "jobId" SERIAL NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "skillsRequired" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("jobId")
);

-- CreateTable
CREATE TABLE "JobClient" (
    "jobId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "JobClient_pkey" PRIMARY KEY ("jobId","clientId")
);

-- CreateTable
CREATE TABLE "JobRound" (
    "roundId" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "roundType" "RoundType" NOT NULL DEFAULT 'OTHER',
    "roundNumber" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "eventTypeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobRound_pkey" PRIMARY KEY ("roundId")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "applicationId" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "candidateEmail" TEXT NOT NULL,
    "candidateId" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'NOT_APPLICABLE',
    "verdict" "Verdict" NOT NULL DEFAULT 'NOT_APPLICABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("applicationId")
);

-- CreateTable
CREATE TABLE "JobApplicationRound" (
    "applicationId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "teamId" INTEGER,
    "memberId" INTEGER,
    "eventId" INTEGER,
    "feedback" TEXT,
    "score" INTEGER DEFAULT 0,
    "video" TEXT,
    "resume" TEXT,
    "transcript" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplicationRound_pkey" PRIMARY KEY ("applicationId","roundId")
);

-- AddForeignKey
ALTER TABLE "JobClient" ADD CONSTRAINT "JobClient_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobClient" ADD CONSTRAINT "JobClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobRound" ADD CONSTRAINT "JobRound_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "EventType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobRound" ADD CONSTRAINT "JobRound_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_candidateEmail_fkey" FOREIGN KEY ("candidateEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationRound" ADD CONSTRAINT "JobApplicationRound_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("applicationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationRound" ADD CONSTRAINT "JobApplicationRound_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "JobRound"("roundId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationRound" ADD CONSTRAINT "JobApplicationRound_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationRound" ADD CONSTRAINT "JobApplicationRound_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
