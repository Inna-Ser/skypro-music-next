"use client";
import classNames from "classnames";
import { Track } from "./track/Track";
import styles from "./PlayList.module.css";
import { useEffect, useRef, useState } from "react";
import { getTracks } from "@/api/Api";
import { TrackItem, Tracks } from "@/tipes";

type Props = {
  tracksList: TrackItem[];
  isLoading: boolean;
  setTracksList: (tracks: TrackItem[]) => void;
  setCurrentTrack: (track: TrackItem) => void;
};

export const PlayList = ({ isLoading, setCurrentTrack, tracksList }: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classNames(styles.content__playlist, styles.playlist)}>
      <p style={{ color: "purple" }}></p>
      {tracksList.map((track) => (
        <Track
          key={track.id}
          isLoading={isLoading}
          name={track.name}
          author={track.author}
          album={track.album}
          time={track.duration_in_seconds}
          setCurrentTrack={() => setCurrentTrack(track)}
        />
      ))}
    </div>
  );
};
