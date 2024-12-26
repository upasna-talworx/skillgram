import Link from "next/link";

import { AddHiringManagerButton } from "@calcom/features/jobs/components/AddHiringManagerButton";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Badge, ButtonGroup, Tooltip, Button } from "@calcom/ui";

type JobType = { jobId: number };

export function JobListItem({ job }: { job: JobType }) {
  const { t } = useLocale();
  // const { data } = trpc.viewer.client.getJob.useQuery({ jobId: job.jobId })
  const data = { jobTitle: "JAVA Developer" };

  function deleteFunction(input: JobType) {
    console.log("Delete item");
    console.log(input);
  }

  return (
    <>
      <li key={job.jobId}>
        <div className="hover:bg-muted flex items-center justify-between py-5 transition ltr:pl-4 rtl:pr-4 sm:ltr:pl-0 sm:rtl:pr-0">
          <div className="group flex w-full items-center justify-between sm:px-6">
            <Link
              href={`client/jobs/${job.jobId}`}
              className="flex-grow truncate text-sm"
              title={data.jobTitle}>
              <div className="space-x-2 rtl:space-x-reverse">
                <span className="text-emphasis truncate font-medium">{data.jobTitle}</span>
                <Badge variant="gray">{job.jobId}</Badge>
              </div>
            </Link>
          </div>
          <ButtonGroup combined>
            <>
              <Tooltip content={t("add_hiring_managers")}>
                <AddHiringManagerButton jobId={job.jobId} />
              </Tooltip>
              <Tooltip content={t("delete")}>
                <Button
                  data-testid="delete-job"
                  color="destructive"
                  variant="icon"
                  StartIcon="trash"
                  onClick={() => {
                    deleteFunction({ jobId: job.jobId });
                  }}
                />
              </Tooltip>
            </>
          </ButtonGroup>
        </div>
      </li>
    </>
  );
}
