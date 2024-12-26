import { useAutoAnimate } from "@formkit/auto-animate/react";

import { JobRoundListItem } from "@calcom/features/connect/JobRoundListItem";
import Shell from "@calcom/features/shell/Shell";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { EmptyScreen } from "@calcom/ui";

function JobRoundsList() {
  const { t } = useLocale();
  const [animationParentRef] = useAutoAnimate<HTMLUListElement>();
  // const allJobRounds = trpc.viewer.connect.getAllJobRounds.useQuery();
  const allJobRounds = [{ id: 1 }, { id: 2 }];

  return (
    <>
      {allJobRounds.length === 0 ? (
        <div className="flex justify-center">
          <EmptyScreen
            Icon="clock"
            headline={t("no_jobs_yet")}
            description={t("no_job_rounds_yet")}
            className="w-full"
          />
        </div>
      ) : (
        <>
          <div className="border-subtle bg-default overflow-hidden rounded-md border">
            <ul className="divide-subtle divide-y" data-testid="jobs" ref={animationParentRef}>
              {allJobRounds.map((jobRound) => (
                <JobRoundListItem key={jobRound.id} jobRound={jobRound} />
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

const AllJobRoundsListingPage = () => {
  const { t } = useLocale();

  return (
    <Shell
      withoutMain={false}
      title="Connect"
      description="Connect Team with Job Round"
      heading={t("connect_job_round_to_team_page_title")}
      hideHeadingOnMobile
      subtitle={t("connect_job_round_to_team_page_subtitle")}>
      <JobRoundsList />
    </Shell>
  );
};

export default AllJobRoundsListingPage;
