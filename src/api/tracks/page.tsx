"use client"
import { getTracks } from "@/api/Api";
import { Centerblock } from "@/components/centerblock/Centerblock";
import { Filter } from "@/components/filterItem/Filter";
import { setInitialTracks } from "@/store/slices/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TrackItem } from "@/tipes";
// import styles from "@/tracks/TracksPage.module.css";
import { useEffect } from "react";

export default function MainTracsPage() {
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
    <>
      <h2 className="centerblockH">Треки</h2>
      <Filter />
      <Centerblock allTracks={allTracks}/>
    </>
  );
}
