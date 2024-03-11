import { useCallback, useMemo } from "react";
import axios from "axios";

import useCurrentUser from "@/hook/useCurrentUser";
import useFavorites from "@/hook/useFavorites";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

export const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);
  

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response =   axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response =   axios.post("/api/favorite", { movieId });
    }
    console.log(response);
    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, currentUser, isFavorite, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="w-6 h-6 lg:w-10 lg:h-10 border-2 border-white rounded-full cursor-pointer hover:border-neutral-300 transition flex items-center justify-center"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};
