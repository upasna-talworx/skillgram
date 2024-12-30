import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePathname } from "next/navigation";

import { AddCandidateButton } from "@calcom/features/jobs/components/AddCandidateButton";
import { CandidateListItem } from "@calcom/features/jobs/components/CandidateListItem";
import Shell from "@calcom/features/shell/Shell";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc/react";
import { EmptyScreen } from "@calcom/ui";

function CandidatesList() {
  const { t } = useLocale();
  const [animationParentRef] = useAutoAnimate<HTMLUListElement>();
  // get jobId from url or somewhere
  const path = usePathname();
  const jobId = path ? +path.split("/")[3] : 0;
  const { data } = trpc.viewer.client.listCandidate.useQuery({ jobId: jobId });
  const candidates = data?.candidates;
  console.log(candidates);

  return (
    <>
      {candidates && candidates.length === 0 ? (
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
              {candidates ? (
                candidates.map((candidate) => (
                  <CandidateListItem key={candidate.candidateId} candidate={candidate} />
                ))
              ) : (
                <></>
              )}
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
  const jobId: number = path ? +path.split("/")[3] : 0;
  const { data } = trpc.viewer.client.getJob.useQuery({ jobId: jobId });

  return (
    <Shell
      withoutMain={false}
      title="Candidate Status"
      description="Monitor the status of Applied Candidates"
      backPath="/client"
      heading={data ? data.job?.jobTitle : "Loading..."}
      hideHeadingOnMobile
      subtitle={t("Monitor the status of Applied Candidates")}
      CTA={<AddCandidateButton />}>
      <CandidatesList />
    </Shell>
  );
};

export default CandidatesListingPage;
