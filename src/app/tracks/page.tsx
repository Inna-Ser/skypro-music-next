"use client";
import { getTracks } from "@/api/Api";
import { Centerblock } from "@/components/centerblock/Centerblock";
import { Filter } from "@/components/filterItem/Filter";
import { setInitialTracks } from "@/store/slices/features/trackSlice";
import { TrackItem } from "@/tipes";
import { useEffect } from "react";
import { Search } from "@/components/centerblock/Centerblock";
import { useAppDispatch, useAppSelector } from "@/hooks/store";

const MainTracsPage = () => {
  const allTracks = useAppSelector((state) => state.tracks.filterPlaylist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTracks()
      .then((data: TrackItem[]) => {
        dispatch(setInitialTracks(data));
      })
      .catch((error) => {
        new Error(error.message);
      });
  }, [setInitialTracks, dispatch]);
  return (
      <div className="headerTrack">
        {/* <Search /> */}
        <h2 className="centerblockH2">Треки</h2>
        <Centerblock allTracks={allTracks} />
      </div>
  );
};

export default MainTracsPage;
