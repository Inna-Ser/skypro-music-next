"use client";

import { useAppSelector } from "@/store/store";
import { Audioplayer } from "../audioplayer/Audioplayer";

export const ClientComponent = () => {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  return <div>{!currentTrack ? null : <Audioplayer />} </div>;
};
