import Image from "next/image";
import Loader from "../public/images/Loader.gif";

import useBillboard from "@/hook/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Billboard = () => {
  const { data, isLoading } = useBillboard();

  return (
    <div className="relative h-[56.25vw]">
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-[56.25vw]">
          <Image src={Loader} alt="loader" className="w-[20%] md:w-[10%]" />
        </div>
      )}
      {!isLoading && (
        <div>
          <video
            // autoPlay
            muted
            loop
            poster={data?.thumbnailUrl}
            src={data?.videoUrl}
            className="w-full h-[56.25vw] object-cover brightness-[60%]"
          ></video>

          <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
            <p className="text-white text-xl md:text-5xl lg:text-6xl h-full font-bold drop-shadow-xl">
              {data?.title}
            </p>

            <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
              {data?.description}
            </p>

            <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
              <button className="bg-white text-white bg-opacity-30 py-1 md:py-2 px-2 md:px-4 w-auto text-xs md:text-lg rounded-md flex flex-row items-center hover:bg-opacity-20 gap-1">
                <AiOutlineInfoCircle />
                More Info
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billboard;
