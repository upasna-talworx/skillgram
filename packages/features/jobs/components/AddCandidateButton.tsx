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

export function AddCandidateButton({ name = "add-candidate" }: { name?: string }) {
  const { t } = useLocale();

  const form = useForm<{
    email: string;
    cv: string;
  }>();
  const { register } = form;
  const utils = trpc.useUtils();

  const createMutation = trpc.viewer.client.addCandidate.useMutation({
    onSuccess: async ({ application }) => {
      console.log(application);
      showToast(t("candidate_added_successfully"), "success");
      // to be handled
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        const message = `${err.statusCode}: ${err.message}`;
        showToast(message, "error");
      }

      if (err.data?.code === "INTERNAL_SERVER_ERROR") {
        const error = `${err.data.code}: ${t("could_not_add_candidate")}`;
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
      <DialogContent title={t("add_candidate")}>
        <Form
          form={form}
          handleSubmit={(input) => {
            // createMutation.mutate(input);
            console.log(input);
          }}>
          <div className="mt-3 space-y-6 pb-11">
            <InputField
              label={t("Candidate Email")}
              type="string"
              id="email"
              required
              placeholder={t("email")}
              {...register("email")}
            />
            <InputField label={t("Candidate CV")} type="string" id="cv" required {...register("cv")} />
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
