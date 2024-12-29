import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { HttpError } from "@calcom/lib/http-error";
import { trpc } from "@calcom/trpc/react";
import { ZCreateJobSchema } from "@calcom/trpc/server/routers/viewer/client/createJob.schema";
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

  const form = useForm<z.infer<typeof ZCreateJobSchema>>({
    resolver: zodResolver(ZCreateJobSchema),
    mode: "onChange",
  });

  const { handleSubmit, register } = form;

  const utils = trpc.useUtils();

  const createMutation = trpc.viewer.client.createJob.useMutation({
    onSuccess: async ({ job }) => {
      console.log(job);
      await router.push(`/client/jobs/${job.jobId}`);
      showToast(t("job_created_successfully", { jobTitle: job.jobTitle }), "success");
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        const message = `${err.statusCode}: ${err.message}`;
        showToast(message, "error");
      } else if (err.data?.code === "INTERNAL_SERVER_ERROR") {
        const message = `${err.data.code}: ${t("could_not_create_job")}`;
        showToast(message, "error");
      } else if (err.data?.code === "BAD_REQUEST") {
        const message = `${err.data.code}: ${t("error_event_type_url_duplicate")}`;
        showToast(message, "error");
      } else if (err.data?.code === "UNAUTHORIZED") {
        const message = `${err.data.code}: ${t("error_job_unauthorized_create")}`;
        showToast(message, "error");
      }
    },
  });

  const onSubmit = handleSubmit(async (data: z.infer<typeof ZCreateJobSchema>) => {
    console.log("Handle Submit successful");
    try {
      // Process skillsRequired into an array
      const processedData = {
        ...data,
      };

      // Submit the processed data using the mutation
      await createMutation.mutateAsync(processedData);

      console.log("Job created successfully:", processedData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  return (
    <Dialog name={name} clearQueryParamsOnClose={["copy-schedule-id"]}>
      <DialogTrigger asChild>
        <Button variant="fab" data-testid={name} StartIcon="plus">
          {t("new")}
        </Button>
      </DialogTrigger>
      <DialogContent title={t("create_new_job")}>
        <Form form={form} onSubmit={onSubmit}>
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
              {...register("yearsOfExperience", { valueAsNumber: true })}
            />
            <div>
              <label htmlFor="uploadJD">{t("upload_job_description")}</label>
              <FileUploader />
            </div>
          </div>
          <div className="flex justify-end">
            <DialogFooter showDivider>
              <DialogClose />
              <Button type="submit" loading={createMutation.isPending} disabled={createMutation.isPending}>
                {t("continue")}
              </Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
