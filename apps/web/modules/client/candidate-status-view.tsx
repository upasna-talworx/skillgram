import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePathname } from "next/navigation";

import { AddCandidateButton } from "@calcom/features/jobs/components/AddCandidateButton";
import { CandidateListItem } from "@calcom/features/jobs/components/CandidateListItem";
import Shell from "@calcom/features/shell/Shell";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { EmptyScreen } from "@calcom/ui";

function CandidatesList() {
  const { t } = useLocale();
  const [animationParentRef] = useAutoAnimate<HTMLUListElement>();
  // get jobId from url or somewhere
  const path = usePathname();
  const job = path.split("/")[2];
  const jobId = parseInt(job, 10);
  // const candidates = trpc.viewer.client.listCandidate.useQuery({ jobId: jobId })
  const candidates = [
    { candidateId: 1, candidateEmail: "abc@mail.com", status: "EMAIL_SENT", verdict: "NOT_APPLICABLE" },
    { candidateId: 2, candidateEmail: "xyz@mail.com", status: "COMPLETED", verdict: "HIRE" },
    { candidateId: 3, candidateEmail: "pqr@mail.com", status: "IN_PROCESS", verdict: "NOT_APPLICABLE" },
  ];

  return (
    <>
      {candidates.length === 0 ? (
        <div className="flex justify-center">
          <EmptyScreen
            Icon="clock"
            headline={t("candidate_status_page_heading")}
            description={t("candidate_status_page_description")}
            className="w-full"
            buttonRaw={<AddCandidateButton />}
          />
        </div>
      ) : (
        <>
          <div className="border-subtle bg-default overflow-hidden rounded-md border">
            <ul className="divide-subtle divide-y" data-testid="jobs" ref={animationParentRef}>
              {candidates.map((candidate) => (
                <CandidateListItem key={candidate.candidateId} candidate={candidate} />
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

const CandidatesListingPage = () => {
  const { t } = useLocale();
  const path = usePathname();
  const job = path.split("/")[2];
  const jobId = parseInt(job, 10);
  // const { data } = trpc.viewer.client.getJob.useQuery({ jobId: jobId })
  const data = { jobTitle: "JAVA Developer" };

  return (
    <Shell
      withoutMain={false}
      title="Candidate Status"
      description="Monitor the status of Applied Candidates"
      backPath="/client"
      heading={data.jobTitle}
      hideHeadingOnMobile
      subtitle={t("Monitor the status of Applied Candidates")}
      CTA={<AddCandidateButton />}>
      <CandidatesList />
    </Shell>
  );
};

export default CandidatesListingPage;
