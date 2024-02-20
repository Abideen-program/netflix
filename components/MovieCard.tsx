import Image from "next/image";

import { BsFillPlayFill } from "react-icons/bs";
import { FavoriteButton } from "./FavoriteButton";

interface MovieCardProp {
  data: Record<string, any>;
}

const MovieCard = ({ data }: MovieCardProp) => {
  return (
    <div className="group bg-zinc-900 col-span-1 h-[12vw] relative z-0">
      <Image
        width={100}
        height={100}
        src={data.thumbnailUrl}
        alt="poster"
        className="w-full h-[12vw] cursor-pointer object-cover rounded-md shadow-xl duration transition delay-300 group-hover:opacity-90 sm:group-hover:opacity-0"
      />
      <div className="opacity-0  absolute top-0 right-0 left-0 z-10 transition duration-200 delay-300 invisible sm:visible group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <Image
          width={100}
          height={100}
          src={data.thumbnailUrl}
          alt="poster"
          className="w-full h-[12vw] cursor-pointer object-cover shadow-xl rounded-t-md transition duration"
        />
        <div className="bg-zinc-800 p-2 lg:p-4 w-full shadow-md transition rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div className="cursor-pointer w-6 h-6 lg:h-10 lg:w-10 bg-white rounded-full flex items-center justify-center hover:bg-neutral-300 transition">
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data.id} />
          </div>

          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>

          <div className="flex flex-col justify-center gap-3 mt-4">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
