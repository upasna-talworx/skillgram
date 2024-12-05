import PageWrapper from "@components/PageWrapper";

import type { PageProps } from "~/getting-started/[[...step]]/onboarding-view";
import OnboardingPage from "~/getting-started/[[...step]]/onboarding-view";
import type { Step } from "~/getting-started/[[...step]]/onboarding-view";

const steps: Step[] = ["user-settings", "connected-calendar", "setup-availability", "user-profile"];

const Page = (props: PageProps) => <OnboardingPage steps={steps} role="panelist" {...props} />;

export { getServerSideProps } from "@lib/getting-started/[[...step]]/getServerSideProps";
Page.PageWrapper = PageWrapper;
export default Page;
