import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";

import { JobListItem } from "@calcom/features/jobs/components/JobListItem";
import { NewJobButton } from "@calcom/features/jobs/components/NewJobButton";
import Shell from "@calcom/features/shell/Shell";
import { useDebounce } from "@calcom/lib/hooks/useDebounce";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { EmptyScreen, TextField, Icon } from "@calcom/ui";

function JobsList() {
  const { t } = useLocale();
  const [animationParentRef] = useAutoAnimate<HTMLUListElement>();
  // const jobs = trpc.viewer.client.listJobs.useQuery();
  const jobs = [{ jobId: 1 }, { jobId: 2 }];

  // const deleteMutation = trpc.viewer.availability.schedule.delete.useMutation({
  //     onMutate: async ({ scheduleId }) => {
  //       await utils.viewer.availability.list.cancel();
  //       const previousValue = utils.viewer.availability.list.getData();
  //       if (previousValue) {
  //         const filteredValue = previousValue.schedules.filter(({ id }) => id !== scheduleId);
  //         utils.viewer.availability.list.setData(undefined, { ...previousValue, schedules: filteredValue });
  //       }

  //       return { previousValue };
  //     },

  //     onError: (err, variables, context) => {
  //       if (context?.previousValue) {
  //         utils.viewer.availability.list.setData(undefined, context.previousValue);
  //       }
  //       if (err instanceof HttpError) {
  //         const message = `${err.statusCode}: ${err.message}`;
  //         showToast(message, "error");
  //       }
  //     },
  //     onSettled: () => {
  //       utils.viewer.availability.list.invalidate();
  //     },
  //     onSuccess: () => {
  //       showToast(t("schedule_deleted_successfully"), "success");
  //     },
  //   });

  //   const updateMutation = trpc.viewer.availability.schedule.update.useMutation({
  //     onSuccess: async ({ schedule }) => {
  //       await utils.viewer.availability.list.invalidate();
  //       showToast(
  //         t("availability_updated_successfully", {
  //           scheduleName: schedule.name,
  //         }),
  //         "success"
  //       );
  //       setBulkUpdateModal(true);
  //     },
  //     onError: (err) => {
  //       if (err instanceof HttpError) {
  //         const message = `${err.statusCode}: ${err.message}`;
  //         showToast(message, "error");
  //       }
  //     },
  //   });

  return (
    <>
      {jobs.length === 0 ? (
        <div className="flex justify-center">
          <EmptyScreen
            Icon="clock"
            headline={t("new_job_heading")}
            description={t("new_job_description")}
            className="w-full"
            buttonRaw={<NewJobButton />}
          />
        </div>
      ) : (
        <>
          <div className="border-subtle bg-default overflow-hidden rounded-md border">
            <ul className="divide-subtle divide-y" data-testid="jobs" ref={animationParentRef}>
              {jobs.map((job) => (
                <JobListItem
                  key={job.jobId}
                  job={job}
                  // deleteFunction={deleteMutation.mutate};
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

const JobListingPage = () => {
  const { t } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // look at event-types-listing-view for search functionality

  return (
    <Shell
      withoutMain={false}
      title="Jobs"
      description="Create Job for your Organization"
      heading={t("job_list_page_title")}
      hideHeadingOnMobile
      subtitle={t("job_list_page_subtitle")}
      CTA={<NewJobButton />}>
      <TextField
        className="max-w-64 bg-subtle !border-muted mb-4 mr-auto rounded-md !pl-0 focus:!ring-offset-0"
        addOnLeading={<Icon name="search" className="text-subtle h-4 w-4" />}
        addOnClassname="!border-muted"
        containerClassName="max-w-64 focus:!ring-offset-0 mb-4"
        type="search"
        value={searchTerm}
        autoComplete="false"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder={t("search")}
      />
      <JobsList />
    </Shell>
  );
};

export default JobListingPage;
