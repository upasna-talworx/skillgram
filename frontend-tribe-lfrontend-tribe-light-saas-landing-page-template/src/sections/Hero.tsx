import Image from "next/image";
import RightImage from "@/assets/Right Image.png";

export const Hero = () => {
  return (
    <div className="w-full relative flex flex-col text-left text-[14px] text-gray-200 font-dm-sans">
      {/* Wrapper for both sections to maintain spacing between scroll down and hero section */}
      <div className="w-full flex flex-row items-start justify-between">
        
        {/* Scroll Down Section aligned with logo */}
        <div className="w-5 relative h-[139px]" style={{ left: "83.4px", marginLeft: "100px" }}>
          <div className="absolute h-[14.39%] w-[417%] top-[60%] left-[0%] tracking-[0.05em] leading-[140.87%] inline-block [transform:_rotate(-90deg)] [transform-origin:0_0] text-[#1d1f23] z-10">
            Scroll down
          </div>
          <Image
            className="absolute h-[31.08%] w-[5%] top-[63.57%] right-[45.01%] bottom-[5.35%] left-[49.99%] max-w-full overflow-hidden max-h-full"
            width={1}
            height={43}
            alt="Arrow Down"
            src="/assets/Vector 2.svg"
          />
          <Image
            className="absolute h-[2.88%] w-2/5 top-[97.14%] right-[30.01%] bottom-[-0.02%] left-[29.99%] max-w-full overflow-hidden max-h-full object-contain"
            width={8}
            height={4}
            alt="Arrow Tip"
            src="/assets/Vector 3.svg"
          />
        </div>

        {/* Main Hero Section */}
        <div className="w-[1078px] h-[568px] relative flex items-start justify-between text-center text-[60.84px] text-primary-dark">
          
          {/* Left Section */}
          <div className="h-full w-[63.91%] bg-lightgray flex flex-col items-center justify-start py-36 px-0 box-border gap-[50px] bg-[#d6d7d7]">
            <div className="w-[689px] flex flex-col items-center justify-start gap-[12.7px]">
              <b className="self-stretch relative leading-[70.98px] text-[#1D1C20]">
                <p className="m-0">The Hiring Solutions</p>
                <p className="m-0">For Your Business</p>
              </b>
              <div className="w-[649px] relative text-[18.59px] leading-[30.42px] text-gray-3 inline-block text-[#828282]">
                Empower your recruiting team. The one-stop platform for all talent acquisition of small to large-sized businesses.
              </div>
            </div>

            {/* Email input and Book a Demo button */}
            <div className="w-[554px] h-[60.8px] relative bg-white rounded-[30px] flex items-center justify-between px-5 py-2">
              <div className="text-gray-400 text-sm">Enter your email address</div>
              <div className="h-[50.7px] w-[152px] bg-black rounded-[30px] flex items-center justify-center px-6 py-2">
                <span className="text-white text-sm">Book a Demo</span>
              </div>
            </div>
          </div>

          {/* Right Image Section with adjusted margin-right for spacing */}
          <div className="h-full w-[36.09%] mr-[60px]"> {/* Reduced margin-right */}
            <Image
              src={RightImage}
              width={389}
              height={568}
              alt="Hero Right Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
