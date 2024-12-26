import { useLocale } from "@calcom/lib/hooks/useLocale";
import {
  Badge,
  Button,
  Dropdown,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownItem,
} from "@calcom/ui";

type JobRoundType = {
  jobId: number;
  roundId: number;
  roundType: string;
  roundNumber: number;
  maxScore: number;
};

export function JobRoundListItem({ jobRound }: { jobRound: JobRoundType }) {
  const { t } = useLocale();

  function deleteFunction(input: JobRoundType) {
    console.log("Delete item");
    console.log(input);
  }

  function updateFunction(input: JobRoundType) {
    console.log("Update item");
    console.log(input);
  }

  return (
    <>
      <li>
        <div className="hover:bg-muted flex items-center justify-between py-5 transition ltr:pl-4 rtl:pr-4 sm:ltr:pl-0 sm:rtl:pr-0">
          <div className="group flex w-full items-center justify-between sm:px-6">
            <div className="space-x-2 rtl:space-x-reverse">
              {jobRound.roundType} &nbsp;
              <Badge variant="gray">
                Job Id: {jobRound.jobId} , Round: {jobRound.roundNumber}
              </Badge>
              <br />
              <p className="truncate text-xs">MAX SCORE: {jobRound.maxScore}</p>
            </div>
          </div>
          <Dropdown>
            <DropdownMenuTrigger asChild>
              <Button
                data-testid="schedule-more"
                className="mx-5"
                type="button"
                variant="icon"
                color="secondary"
                StartIcon="ellipsis"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="min-w-40 focus:ring-muted">
                <DropdownItem
                  type="button"
                  color="minimal"
                  onClick={() => {
                    updateFunction(jobRound);
                  }}>
                  {t("update_details")}
                </DropdownItem>
              </DropdownMenuItem>
              <DropdownMenuItem className="min-w-40 focus:ring-muted">
                <DropdownItem
                  type="button"
                  color="destructive"
                  StartIcon="trash"
                  onClick={() => {
                    deleteFunction(jobRound);
                  }}>
                  {t("delete")}
                </DropdownItem>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </Dropdown>
        </div>
      </li>
    </>
  );
}
