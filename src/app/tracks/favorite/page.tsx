"use client";
import { Centerblock } from "@/components/centerblock/Centerblock";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setFilter, setInitialTracks } from "@/store/slices/features/trackSlice";
import { useEffect } from "react";

const Favorite = () => {
  const likedTracks = useAppSelector((state) => state.tracks.likedTracks);
  const filterPlaylist = useAppSelector((state) => state.tracks.filterPlaylist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (likedTracks) {
      dispatch(setFilter({ tracks: likedTracks }));
    //   dispatch(setInitialTracks(likedTracks));
    }
  }, [likedTracks, dispatch]);

  return (
    <div>
      <h2 className="centerblockH2">Мои треки</h2>
      <Centerblock filterPlaylist={filterPlaylist} />
    </div>
  );
};

export default Favorite;
