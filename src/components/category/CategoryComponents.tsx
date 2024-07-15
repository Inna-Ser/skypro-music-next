"use client";
import { getCategoryTracks } from "@/api/Api";
import { Centerblock } from "../centerblock/Centerblock";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useEffect } from "react";
import { TrackItem } from "@/tipes";
import { setInitialTracks } from "@/store/slices/features/trackSlice";

export const CategoryComponent = ({ id }: { id: string }) => {
  const filterPlaylist = useAppSelector((state) => state.tracks.filterPlaylist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategoryTracks(id)
      .then((data: TrackItem[]) => {
        dispatch(setInitialTracks(data));
      })
      .catch((error) => {
        new Error(error.message);
      });
  }, [dispatch, id]);

  return (
    <div>
      <Centerblock filterPlaylist={filterPlaylist} />
    </div>
  );
};
