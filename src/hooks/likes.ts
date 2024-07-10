import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import {
  getFavoriteTracks,
  setIsDisliked,
  setIsLiked,
} from "@/store/slices/features/trackSlice";
import { addDisLike, addLike } from "@/api/Api";

export const useInitializeLikedTracks = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);

  useEffect(() => {
    if (tokens.access) {
      dispatch(getFavoriteTracks(tokens.access));
    }
  }, [tokens, dispatch]);
};

export const useLikeTracks = ({ track }: { track: any }) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);
  const likedTracks = useAppSelector((state) => state.tracks.likedTracks);
  const isLiked = likedTracks.find((tr) => tr.id === track.id);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tokens.access) {
      return alert("Пользователь не авторизован");
    }
    const action = isLiked ? addDisLike : addLike;
    try {
      await action(track.id, tokens.access);
      isLiked ? dispatch(setIsDisliked(track)) : dispatch(setIsLiked(track));
    } catch (error) {
      console.error(error);
    }
  };
  return { isLiked, handleLike };
};
