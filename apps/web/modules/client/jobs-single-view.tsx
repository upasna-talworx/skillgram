import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/navigation";

import { JobRoundListItem } from "@calcom/features/jobs/components/JobRoundListItem";
import { NewJobRoundButton } from "@calcom/features/jobs/components/NewJobRoundButton";
import Shell from "@calcom/features/shell/Shell";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { EmptyScreen } from "@calcom/ui";

function JobRoundsList() {
  const { t } = useLocale();
  const [animationParentRef] = useAutoAnimate<HTMLUListElement>();
  const router = useRouter();
  console.log(router);
  const { job } = router.query;
  const jobId = parseInt(job, 10);
  // const jobRounds = trpc.viewer.client.getJobRound.useQuery({ jobId: jobId })
  const jobRounds = [
    { jobId: jobId, roundId: 1, roundType: "QUIZ", roundNumber: 1, maxScore: 10 },
    { jobId: jobId, roundId: 2, roundType: "INTERVIEW", roundNumber: 2, maxScore: 20 },
  ];

  return (
    <>
      {jobRounds.length === 0 ? (
        <div className="flex justify-center">
          <EmptyScreen
            Icon="clock"
            headline={t("new_job_heading")}
            description={t("new_job_description")}
            className="w-full"
            buttonRaw={<NewJobRoundButton />}
          />
        </div>
      ) : (
        <>
          <div className="border-subtle bg-default overflow-hidden rounded-md border">
            <ul className="divide-subtle divide-y" data-testid="jobs" ref={animationParentRef}>
              {jobRounds.map((jobRound) => (
                <JobRoundListItem key={jobRound.roundId} jobRound={jobRound} />
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

const JobSingleView = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { job } = router.query;
  const jobId = parseInt(job, 10);
  // const { data } = trpc.viewer.client.getJob.useQuery({ jobId: jobId })
  const data = { jobTitle: "JAVA Developer" };

  return (
    <Shell
      withoutMain={false}
      title="Job Rounds"
      description="Add Evaluating Rounds specific to your Job"
      backPath="/client"
      heading={data.jobTitle}
      hideHeadingOnMobile
      subtitle={t("job_round_list_page_subtitle")}
      CTA={<NewJobRoundButton />}>
      <JobRoundsList />
    </Shell>
  );
};

export default JobSingleView;
