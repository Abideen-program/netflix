import { useCallback, useMemo } from "react";
import axios from "axios";

import useCurrentUser from "@/hook/useCurrentUser";
import useFavorites from "@/hook/useFavorites";
import { AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

export const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  return (
    <div className="w-6 h-6 lg:w-10 lg:h-10 border-2 border-white rounded-full cursor-pointer hover:border-neutral-300 transition flex items-center justify-center">
      <AiOutlinePlus className="text-white" size={25} />
    </div>
  );
};
