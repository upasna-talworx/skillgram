import { ConnectTeamButton } from "@calcom/features/connect/ConnectTeam";
import { Badge } from "@calcom/ui";

type JobRoundType = { id: number };

export function JobRoundListItem({ jobRound }: { jobRound: JobRoundType }) {
  // data = trpc.viewer.connect.getJobRound.useQuery({ id: jobRound.id })
  const data = { roundId: 1, jobTitle: "Java Developer", roundType: "INTERVIEW", client: "Oracle" };

  return (
    <>
      <li>
        <div className="hover:bg-muted flex items-center justify-between py-5 transition ltr:pl-4 rtl:pr-4 sm:ltr:pl-0 sm:rtl:pr-0">
          <div className="group flex w-full items-center justify-between sm:px-6">
            <div className="space-x-2 rtl:space-x-reverse">
              <span className="text-emphasis truncate font-medium">{data.jobTitle}</span>
              <Badge variant="gray">{jobRound.id}</Badge>
              <div className="text-emphasis truncate text-sm font-medium">{data.client}</div>
              <div className="text-emphasis truncate text-sm font-medium">{data.roundType}</div>
            </div>
            <ConnectTeamButton roundId={data.roundId} />
          </div>
        </div>
      </li>
    </>
  );
}
