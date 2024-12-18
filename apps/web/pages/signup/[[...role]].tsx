import { useParamsWithFallback } from "@calcom/lib/hooks/useParamsWithFallback";

import { getServerSideProps } from "@lib/signup/getServerSideProps";

import PageWrapper from "@components/PageWrapper";

import type { SignupProps } from "~/signup-view";
import Signup from "~/signup-view";

console.log("hey trying to signup");
const Page = (props: SignupProps) => {
  const { role } = useParamsWithFallback();
  role ? console.log(role[0]) : null;
  return <Signup {...props} role={role ? role[0] : "admin"} />;
};

export { getServerSideProps };
Page.PageWrapper = PageWrapper;
export default Page;
