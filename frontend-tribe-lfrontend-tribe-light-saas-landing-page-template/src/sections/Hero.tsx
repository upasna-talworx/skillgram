import Image from "next/image";
import RightImage from "@/assets/Right Image.png";
import Arrowdown from "@/assets/Vector 2.svg";
import Arrowtip from "@/assets/Vector 3.svg";
import { px } from "framer-motion";

export const Hero = () => {
  return (
    <div className="w-full relative flex flex-col text-left text-[16px] text-gray-200 font-dm-sans">
      {/* Wrapper Container for responsiveness */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Wrapper for both sections */}
        <div className="w-full flex flex-row items-start justify-between pt-[5vh] flex-wrap md:flex-nowrap">

          {/* Scroll Down Section */}
          <div className="w-5 relative h-[139px]" style={{ left: "83.4px", marginLeft: "50px" }}>
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
          <div className="w-full md:w-[1300px] h-full flex items-start justify-end text-center text-[72px] text-primary-dark pr-[180px] pl-[365px]">

            {/* Left Section */}
            <div className="w-full md:w-[45%] h-[558px] bg-[#d6d7d7] flex flex-col items-start justify-center py-[80px] px-[60px] gap-[40px]">
              <div className="w-full">
                <h1 className="text-[54px] font-bold text-[#1D1F23] leading-[1.2]">
                  The Hiring Solutions <br /> For Your Business
                </h1>
                <p className="text-[20px] text-[#828282] mt-[20px] leading-[1.6]">
                  Empower your recruiting team. The one-stop platform for all talent acquisition of small to large-sized businesses.
                </p>
              </div>
              {/* Outer Button Wrapping both Input and Button with Flex Container inside */}
              <button className="w-full flex items-center bg-white shadow-md rounded-full overflow-hidden space-x-4">
                {/* Flex Container to adjust the spacing of input and button */}
                <div className="flex items-center w-full">
                  {/* Input Field with Correct Custom Dimensions */}
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 text-gray-600 text-sm outline-none"
                    style={{ height: "40.84px" }} // Adjusted height for the input field
                  />
                  {/* Book a Demo Button */}
                  <button
                    className="bg-black text-white px-8 py-4 text-sm font-medium rounded-full hover:bg-gray-800 transition"
                    style={{ height: "60.84px" }} // Adjusted height to match input field
                  >
                    Book a Demo
                  </button>
                </div>
              </button>
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
    </div>
  );
};
