"use client";
import { getCategoryTracks } from "@/api/Api";
import { Centerblock } from "../centerblock/Centerblock";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useEffect } from "react";
import { TrackItem } from "@/tipes";
import { getFavoriteTracks, setFilter, setInitialTracks } from "@/store/slices/features/trackSlice";

type Props = {
  filterPlaylist: TrackItem[];
};

export const FavoriteComponent = ({ filterPlaylist }: Props) => {
  
  return (
    <div>
      <Centerblock filterPlaylist={filterPlaylist} />
    </div>
  );
};
