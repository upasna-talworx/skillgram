import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { md } from "@calcom/lib/markdownIt";
import { telemetryEventTypes, useTelemetry } from "@calcom/lib/telemetry";
import turndown from "@calcom/lib/turndownService";
import { trpc } from "@calcom/trpc/react";
import { ZAdminSetupInputSchema } from "@calcom/trpc/server/routers/loggedInViewer/setupAdmin.schema";
import { ZCandidateSetupInputSchema } from "@calcom/trpc/server/routers/loggedInViewer/setupCandidate.schema";
import { ZPanellistSetupInputSchema } from "@calcom/trpc/server/routers/loggedInViewer/setupPanellist.schema";
import { Button, Editor, ImageUploader, Label, showToast } from "@calcom/ui";
import { UserAvatar } from "@calcom/ui";

const roleSchemaMap: Record<string, z.ZodType<any>> = {
  panelist: ZPanellistSetupInputSchema,
  candidate: ZCandidateSetupInputSchema,
  admin: ZAdminSetupInputSchema,
};

type UserProfileProps = {
  role: string;
};

const UserProfile = ({ role }: UserProfileProps) => {
  const [user] = trpc.viewer.me.useSuspenseQuery();
  const { t } = useLocale();
  const avatarRef = useRef<HTMLInputElement>(null);
  // Dynamically select schema
  const selectedSchema = roleSchemaMap[role];
  const {
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof selectedSchema>>({
    resolver: zodResolver(selectedSchema),
    defaultValues: {
      name: "",
      image: "",
    },
    mode: "onChange",
  });

  const { data: eventTypes } = trpc.viewer.eventTypes.list.useQuery();
  const [imageSrc, setImageSrc] = useState<string>(user?.avatar || "");
  const utils = trpc.useUtils();
  const router = useRouter();
  const createEventType = trpc.viewer.eventTypes.create.useMutation();
  const telemetry = useTelemetry();
  const [firstRender, setFirstRender] = useState(true);
  const mutationCandidate = trpc.viewer.setupCandidate.useMutation();
  const mutationPanelist = trpc.viewer.setupPanellist.useMutation();
  const mutationAdmin = trpc.viewer.setupAdmin.useMutation();

  const mutation = trpc.viewer.updateProfile.useMutation({
    onSuccess: async (_data, context) => {
      if (context.avatarUrl) {
        showToast(t("your_user_profile_updated_successfully"), "success");
        await utils.viewer.me.refetch();
      } else
        try {
          if (eventTypes?.length === 0) {
            await Promise.all(
              DEFAULT_EVENT_TYPES.map(async (event) => {
                return createEventType.mutate(event);
              })
            );
          }
        } catch (error) {
          console.error(error);
        }

      await utils.viewer.me.refetch();
      const redirectUrl = localStorage.getItem("onBoardingRedirect");
      localStorage.removeItem("onBoardingRedirect");

      redirectUrl ? router.push(redirectUrl) : router.push("/");
    },
    onError: () => {
      showToast(t("problem_saving_user_profile"), "error");
    },
  });
  const onSubmit = handleSubmit(async (data: z.infer<typeof selectedSchema>) => {
    const { bio, name, resume, company, yoe, skills } = data;

    telemetry.event(telemetryEventTypes.onboardingFinished);
    // Role-specific logic
    try {
      switch (role) {
        case "candidate":
          try {
            await mutationCandidate.mutateAsync({
              name: user?.name || "",
              bio,
              resume,
              image: avatarRef.current?.value || "", // If you need an image, include it here
            });
          } catch (error) {
            console.error("Error executing Candidate:", error);
          }
          break;

        case "panelist":
          try {
            await mutationPanelist.mutateAsync({
              name: user?.name || "",
              company,
              yoe,
              skills,
            });
          } catch (error) {
            console.error("Error executing Panelist:", error);
          }
          break;

        case "admin":
          try {
            await mutationAdmin.mutateAsync({
              name: user?.name || "",
            });
          } catch (error) {
            console.error("Error executing Admin:", error);
          }
          break;

        default:
          console.error("Invalid role specified");
      }

      console.log(`${role} setup completed successfully.`);
    } catch (error) {
      console.error(`Error setting up ${role}:`, error);
    }
    // Mutate the base user profile
    await mutation.mutateAsync({
      bio,
      completedOnboarding: true,
    });
  });

  async function updateProfileHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredAvatar = avatarRef.current?.value;
    mutation.mutate({
      avatarUrl: enteredAvatar,
    });
  }

  const DEFAULT_EVENT_TYPES = [
    {
      title: t("15min_meeting"),
      slug: "15min",
      length: 15,
    },
    {
      title: t("30min_meeting"),
      slug: "30min",
      length: 30,
    },
    {
      title: t("secret_meeting"),
      slug: "secret",
      length: 15,
      hidden: true,
    },
  ];

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-row items-center justify-start rtl:justify-end">
        {user && <UserAvatar size="lg" user={user} previewSrc={imageSrc} />}
        <input
          ref={avatarRef}
          type="hidden"
          name="avatar"
          id="avatar"
          placeholder="URL"
          className="border-default focus:ring-empthasis mt-1 block w-full rounded-sm border px-3 py-2 text-sm focus:border-gray-800 focus:outline-none"
          defaultValue={imageSrc}
        />
        <div className="flex items-center px-4">
          <ImageUploader
            target="avatar"
            id="avatar-upload"
            buttonMsg={t("add_profile_photo")}
            handleAvatarChange={(newAvatar) => {
              if (avatarRef.current) {
                avatarRef.current.value = newAvatar;
              }
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              )?.set;
              nativeInputValueSetter?.call(avatarRef.current, newAvatar);
              const ev2 = new Event("input", { bubbles: true });
              avatarRef.current?.dispatchEvent(ev2);
              updateProfileHandler(ev2 as unknown as FormEvent<HTMLFormElement>);
              setImageSrc(newAvatar);
            }}
            imageSrc={imageSrc}
          />
        </div>
      </div>
      {role === "candidate" && (
        <>
          <fieldset className="mt-8">
            <Label className="text-default mb-2 block text-sm font-medium"> {t("Resume")} </Label>
            <Editor
              getText={() => getValues("resume") || ""}
              setText={(value: string) => setValue("resume", value)}
              placeholder={t("resume_url")}
              plainText
              excludedToolbarItems={["bold", "link", "italic", "blockType"]}
            />
          </fieldset>
        </>
      )}

      {role === "panelist" && (
        <>
          <fieldset className="mt-8">
            <label className="text-default mb-2 block text-sm font-medium">{t("Current Company")}</label>
            <Editor
              getText={() => getValues("company") || ""}
              setText={(value: string) => setValue("company", value)}
              placeholder={t("company_name")}
              plainText
              excludedToolbarItems={["bold", "link", "italic", "blockType"]}
            />
          </fieldset>
          <fieldset className="mt-8">
            <label className="text-default mb-2 block text-sm font-medium">{t("Years Of Experience")}</label>
            <Editor
              getText={() => getValues("yoe")?.toString() || ""}
              setText={(value: string) => setValue("yoe", parseInt(value) || value)}
              placeholder={t("years_of_experience")}
              plainText
              excludedToolbarItems={["bold", "link", "italic", "blockType"]}
            />
            {/* Display Error */}
            {errors.yoe && (
              <p className="mt-2 text-sm text-red-500">
                {errors.yoe.message || "Please provide a valid number for years of experience."}
              </p>
            )}
          </fieldset>
          <fieldset className="mt-8">
            <label className="text-default mb-2 block text-sm font-medium">{t("Skills")}</label>
            <Editor
              getText={() => getValues("skills")?.join(", ") || ""}
              setText={(value: string) =>
                setValue(
                  "skills",
                  value.split(",").map((s) => s.trim())
                )
              }
              placeholder={t("Mention your skills (separate them with comma)")}
              plainText
              excludedToolbarItems={["bold", "link", "italic", "blockType"]}
            />
          </fieldset>
        </>
      )}

      {role != "admin" && (
        <>
          <fieldset className="mt-8">
            <Label className="text-default mb-2 block text-sm font-medium">{t("about")}</Label>
            <Editor
              getText={() => md.render(getValues("bio") || user?.bio || "")}
              setText={(value: string) => setValue("bio", turndown(value))}
              excludedToolbarItems={["blockType"]}
              firstRender={firstRender}
              setFirstRender={setFirstRender}
            />
            <p className="text-default mt-2 font-sans text-sm font-normal">
              {t("few_sentences_about_yourself")}
            </p>
          </fieldset>
        </>
      )}

      <Button
        loading={mutation.isPending}
        EndIcon="arrow-right"
        type="submit"
        className="mt-8 w-full items-center justify-center">
        {t("finish")}
      </Button>
    </form>
  );
};

export default UserProfile;
