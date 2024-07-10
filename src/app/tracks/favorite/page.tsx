"use client";
import { Centerblock } from "@/components/centerblock/Centerblock";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  setFilter,
  setInitialTracks,
} from "@/store/slices/features/trackSlice";
import { useEffect } from "react";

const Favorite = () => {
  const dispatch = useAppDispatch();
  const likedTracks = useAppSelector((state) => state.tracks.likedTracks);

  useEffect(() => {
    dispatch(setInitialTracks(likedTracks));
    dispatch(setFilter({ tracks: likedTracks }));
  }, [likedTracks, dispatch]);
  return (
    <div>
      <h2 className="centerblockH2">Мои треки</h2>
      <Centerblock filterPlaylist={likedTracks} />
    </div>
  );
};

export default Favorite;
