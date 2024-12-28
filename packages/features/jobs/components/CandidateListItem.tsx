import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Badge } from "@calcom/ui";

type CandidateType = {
  candidateId: number;
  candidateEmail: string;
  status: string;
  verdict: string;
};

export function CandidateListItem({ candidate }: { candidate: CandidateType }) {
  const { t } = useLocale();

  return (
    <>
      <li>
        <div className="hover:bg-muted flex items-center justify-between py-5 transition ltr:pl-4 rtl:pr-4 sm:ltr:pl-0 sm:rtl:pr-0">
          <div className="group flex w-full items-center justify-between sm:px-6">
            <div className="space-x-2 rtl:space-x-reverse">
              {candidate.candidateEmail} &nbsp;
              <Badge variant="gray">{candidate.candidateId}</Badge>
              <br />
              <p className="truncate text-xs">STATUS: {candidate.status}</p>
              <p className="truncate text-xs">VERDICT: {candidate.verdict}</p>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
