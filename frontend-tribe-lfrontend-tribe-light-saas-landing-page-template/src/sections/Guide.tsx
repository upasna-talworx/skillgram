import Step1Icon from "@/assets/Step 1 Icon.svg";
import GuideLogo from "@/assets/Guide Logo.svg";
import Step2Icon from "@/assets/Step 2 Icon.svg";
import Step3Icon from "@/assets/Step 3 Icon.svg";
import Tick from "@/assets/SVG.svg";

export const Guide = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-start text-center text-[14px] text-primary-dark font-dm-sans py-0 px-px box-border gap-[81px] mb-16 mt-16">
      {/* Guide section content */}
      <div className="flex flex-col items-center justify-start py-0 px-px gap-[55px]">
        {/* Upper section */}
        <div className="w-[1067px] flex flex-col items-center justify-center gap-4">
          {/* Guide Banner */}
          <div className="rounded-[32px] bg-gray-6 border-black border-[1px] border-solid overflow-hidden flex flex-row items-center justify-center py-2 px-3 gap-1 text-left">
            <GuideLogo className="w-3.5 relative h-3.5 overflow-hidden shrink-0" />
            <div className="relative leading-[16.8px] font-medium">Guide</div>
          </div>
          {/* Guide heading */}
          <div className="self-stretch flex flex-col items-center justify-start py-0 px-[91.9px] text-[47.81px]">
            <b className="relative leading-[48px] inline-block max-w-[728px]">
              Hire With Few Easy Steps
            </b>
          </div>
          {/* Guide description */}
          <div className="self-stretch relative text-[18px] leading-[30px] text-gray-1 flex items-center h-[92px] shrink-0">
            <span>
              <p className="m-0">
                Streamline Your Hiring Process in Three Simple Steps. Schedule
                interviews effortlessly with just a few clicks.
              </p>
              <p className="m-0">
                Save time and boost efficiency in three easy steps!
              </p>
            </span>
          </div>
        </div>

        {/* Cards Section */}
        <div className="w-[1068px] h-[457px] overflow-hidden flex flex-row items-stretch justify-between gap-6">
          {/* Card 1 */}
          <div className="flex-1 rounded-2xl bg-whitesmoke border border-[#bdbdbd] p-6 flex flex-col items-center justify-between self-stretch border-solid">
            <div className="text-center">
              <Step1Icon className="w-8 h-8 mb-4" />
              <div className="text-[27.1px] font-dm-sans mb-2 text-black">
                Add Your Candidates
              </div>
              <p className="text-[13.11px] font-dm-sans text-[#333333] mb-4">
                Simply add your candidate list and let the scheduling begin.
                Fast, efficient, and ready to go!
              </p>
              <ul className="text-[13.11px] font-dm-sans text-[#333333] space-y-2">
                <li className="flex items-center">
                  <Tick className="w-4 h-4 mr-2" />
                  Bulk import from CSV
                </li>
                <li className="flex items-center">
                  <Tick className="w-4 h-4 mr-2" />
                  Manual entry option available
                </li>
                <li className="flex items-center">
                  <Tick className="w-4 h-4 mr-2" />
                  Easily manage and update lists
                </li>
              </ul>
            </div>
            <button className="w-[253.24px] h-[50.88px] bg-[#2F7ADC] text-white rounded-[50px] text-sm font-medium">
              Get started
            </button>
          </div>

          {/* Card 2 */}
          <div className="flex-1 rounded-2xl bg-whitesmoke border border-[#bdbdbd] p-6 flex flex-col items-center justify-between self-stretch border-solid">
            <div className="text-center">
              <Step2Icon className="w-8 h-8 mb-4" />
              <div className="text-[27.1px] font-dm-sans mb-2 text-black">
                Upload Job Description
              </div>
              <p className="text-[13.11px] font-dm-sans text-[#333333] mb-4">
                Easily upload the job details to get started. No hassle, just a
                quick upload to kick off the process.
              </p>
              <ul className="text-[13.11px] font-dm-sans text-[#333333] space-y-2">
                <li className="flex items-center">
                  <Tick className="w-4 h-4 mr-2" />
                  Quick drag-and-drop upload
                </li>
                <li className="flex items-center">
                  <Tick className="w-4 h-4 mr-2" />
                  No formatting required
                </li>
                <li className="flex items-center">
                  <Tick className="w-4 h-4 mr-2" />
                  Effortless job detail input
                </li>
              </ul>
            </div>
            <button className="w-[253.24px] h-[50.88px] bg-white text-[#3b3b3b] border border-[#3b3b3b] rounded-[50px] text-sm font-medium">
              Get started
            </button>
          </div>

          {/* Card 3 */}
          <div className="flex-1 rounded-2xl bg-whitesmoke border border-[#bdbdbd] p-6 flex flex-col items-center justify-between self-stretch border-solid">
            <div className="text-center">
              <Step3Icon className="w-8 h-8 mb-4" />
              <div className="text-[27.1px] font-dm-sans mb-2 text-black">
                Select Rounds
              </div>
              <p className="text-[13.11px] font-dm-sans text-[#333333] mb-4">
                Choose the number of interview rounds that fit your hiring
                needs. Tailor the process for a perfect candidate evaluation.
              </p>
              <ul className="text-[13.11px] font-dm-sans text-[#333333] space-y-2">
                <li className="flex items-center">
                  <Tick className="w-4 h-4 mr-2" />
                  Customize based on role
                </li>
                <li className="flex items-center">
                  <Tick className="w-4 h-4 mr-2" />
                  Choose from pre-set options
                </li>
                <li className="flex items-center">
                  <Tick className="w-4 h-4 mr-2" />
                  Full flexibility included
                </li>
              </ul>
            </div>
            <button className="w-[253.24px] h-[50.88px] bg-[#1D1C20] text-white rounded-[50px] text-sm font-medium">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
