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

export function AddHiringManagerButton({
  name = "add-hiring-manager",
  jobId,
}: {
  name?: string;
  jobId: number;
}) {
  const { t } = useLocale();

  const form = useForm<{
    email: string;
  }>();
  const { register } = form;
  const utils = trpc.useUtils();

  const createMutation = trpc.viewer.client.addHiringManager.useMutation({
    onSuccess: async ({ manager }) => {
      console.log(manager);
      showToast(t("hiring_manager_added"), "success");
      // to be handled
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        const message = `${err.statusCode}: ${err.message}`;
        showToast(message, "error");
      }

      if (err.data?.code === "INTERNAL_SERVER_ERROR") {
        const error = `${err.data.code}: ${t("could_not_add_hiring_manager")}`;
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
          {t("Add Hiring Manager")}
        </Button>
      </DialogTrigger>
      <DialogContent title={t("add_hiring_manager")}>
        <Form
          form={form}
          handleSubmit={(input) => {
            const values = { jobId: jobId, ...input };
            createMutation.mutate(values);
            console.log(values);
          }}>
          <div className="mt-3 space-y-6 pb-11">
            <InputField
              label={t("email")}
              type="text"
              id="hm_email"
              required
              placeholder={t("hiring_manager_email")}
              {...register("email")}
            />
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
