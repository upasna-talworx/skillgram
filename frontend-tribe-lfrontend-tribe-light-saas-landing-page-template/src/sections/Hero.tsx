import Image from "next/image";
import RightImage from "@/assets/Right Image.png";
import Arrowdown from "@/assets/Vector 2.svg";
import Arrowtip from "@/assets/Vector 3.svg";

export const Hero = () => {
  return (
    <div className="w-full relative flex flex-col text-left text-[16px] text-gray-200 font-dm-sans"> {/* Increased base font size */}
      {/* Wrapper for both sections to maintain spacing between scroll down and hero section */}
      <div className="w-full flex flex-row items-start justify-between mt-[0px] pt-[10vh]"> {/* Reduced top padding */}
        
        {/* Scroll Down Section aligned with logo */}
        <div className="w-5 relative h-[139px]" style={{ left: "83.4px", marginLeft: "100px" }}>
        <div className="absolute h-[14.39%] w-[417%] top-[60%] left-[0%] tracking-[0.05em] leading-[140.87%] inline-block [transform:_rotate(-90deg)] [transform-origin:0_0] text-[#1d1f23] z-10 text-[14px]">
  Scroll down
</div>

          <Arrowdown
            className="absolute h-[31.08%] w-[5%] top-[63.57%] right-[45.01%] bottom-[5.35%] left-[49.99%] max-w-full overflow-hidden max-h-full"
            alt="Arrow Down"
          />
          <Arrowtip
            className="absolute h-[2.88%] w-2/5 top-[97.14%] right-[30.01%] bottom-[-0.02%] left-[29.99%] max-w-full overflow-hidden max-h-full object-contain"
            alt="Arrow Tip"
          />
        </div>

        {/* Main Hero Section */}
        <div className="w-[1300px] h-[800px] relative flex items-start justify-between text-center text-[72px] text-primary-dark pr-[180px]"> {/* Increased size of main section */}
          
          {/* Left Section */}
          <div className="h-[717.66px] w-[63.91%] bg-lightgray flex flex-col items-center justify-start py-40 px-0 box-border gap-[60px] bg-[#d6d7d7]"> {/* Adjusted height and padding */}
            <div className="w-[850px] flex flex-col items-center justify-start gap-[16px]"> {/* Increased width */}
              <b className="self-stretch relative leading-[80px] text-[#1D1C20]"> {/* Increased font size */}
                <p className="m-0">The Hiring Solutions</p>
                <p className="m-0">For Your Business</p>
              </b>
              <div className="w-[800px] relative text-[22px] leading-[36px] text-gray-3 inline-block text-[#828282]"> {/* Increased text size */}
                Empower your recruiting team. The one-stop platform for all talent acquisition of small to large-sized businesses.
              </div>
            </div>

            {/* Email input and Book a Demo button */}
            <div className="w-[700px] h-[70px] relative bg-white rounded-[30px] flex items-center justify-between px-6 py-3"> {/* Increased width and height */}
              <div className="text-gray-400 text-sm">Enter your email address</div>
              <div className="h-[60px] w-[190px] bg-black rounded-[30px] flex items-center justify-center px-8 py-3"> {/* Increased button size */}
                <span className="text-white text-sm">Book a Demo</span>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="h-full w-[36.09%]">
            <Image
              src={RightImage}
              alt="Hero Right Image"
              layout="intrinsic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
