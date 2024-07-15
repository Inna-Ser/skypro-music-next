"use client";
import { useAppSelector } from "@/hooks/store";
import { Audioplayer } from "../audioplayer/Audioplayer";

export const ClientComponent = () => {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  return <div>{!currentTrack ? null : <Audioplayer />} </div>;
};
