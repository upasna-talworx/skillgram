import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { HttpError } from "@calcom/lib/http-error";
import { trpc } from "@calcom/trpc/react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Form,
  InputField,
  showToast,
} from "@calcom/ui";

import { FileUploader } from "./FileUploader";

export function NewJobButton({ name = "new-job" }: { name?: string }) {
  const router = useRouter();
  const { t } = useLocale();

  const form = useForm<{
    jobTitle: string;
    yearsOfExperience: number;
    jobDescription: string;
    skillsRequired: string;
  }>();
  const { register } = form;
  const utils = trpc.useUtils();

  // const createMutation = trpc.viewer.availability.schedule.create.useMutation({
  //   onSuccess: async ({ schedule }) => {
  //     await router.push(`/availability/${schedule.id}${fromEventType ? "?fromEventType=true" : ""}`);
  //     showToast(t("schedule_created_successfully", { scheduleName: schedule.name }), "success");
  //     utils.viewer.availability.list.setData(undefined, (data) => {
  //       const newSchedule = { ...schedule, isDefault: false, availability: [] };
  //       if (!data)
  //         return {
  //           schedules: [newSchedule],
  //         };
  //       return {
  //         ...data,
  //         schedules: [...data.schedules, newSchedule],
  //       };
  //     });
  //   }

  const createMutation = trpc.viewer.client.createJob.useMutation({
    onSuccess: async ({ job }) => {
      console.log(job);
      await router.push(`/client/jobs/${job.jobId}`);
      showToast(t("job_created_successfully", { jobTitle: job.jobTitle }), "success");
      // to be handled
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        const message = `${err.statusCode}: ${err.message}`;
        showToast(message, "error");
      }

      if (err.data?.code === "INTERNAL_SERVER_ERROR") {
        const error = `${err.data.code}: ${t("could_not_create_job")}`;
      }

      // if (err.data?.code === "BAD_REQUEST") {
      //   error = `${err.data.code}: ${t("error_event_type_url_duplicate")}`;
      // }

      // if (err.data?.code === "UNAUTHORIZED") {
      //   const message = `${err.data.code}: ${t("error_job_unauthorized_create")}`;
      //   showToast(message, "error");
      // }
    },
  });

  return (
    <Dialog name={name} clearQueryParamsOnClose={["copy-schedule-id"]}>
      <DialogTrigger asChild>
        <Button variant="fab" data-testid={name} StartIcon="plus">
          {t("new")}
        </Button>
      </DialogTrigger>
      <DialogContent title={t("create_new_job")}>
        <Form
          form={form}
          handleSubmit={(input) => {
            // split skills string by ',' and convert to array of strings skills
            const values = JSON.parse(JSON.stringify(input));
            values.skillsRequired = input.skillsRequired.split(",");
            createMutation.mutate(values);
            console.log(values);
          }}>
          <div className="mt-3 space-y-6 pb-11">
            <InputField
              label={t("job_title")}
              type="text"
              id="jobTitle"
              required
              placeholder={t("job_title")}
              {...register("jobTitle")}
            />
            <InputField
              label={t("years_of_experience")}
              type="number"
              id="yearsOfExperience"
              required
              placeholder={t("years_of_experience")}
              {...register("yearsOfExperience")}
            />
            <div>Upload JD</div>
            <FileUploader />
          </div>
          <div className="justify-end">
            <DialogFooter showDivider>
              <DialogClose />
              <Button type="submit" loading={createMutation.isPending}>
                {t("continue")}
              </Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
