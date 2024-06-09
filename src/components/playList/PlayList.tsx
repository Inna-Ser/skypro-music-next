"use client";
import classNames from "classnames";
import { Track } from "./track/Track";
import styles from "./PlayList.module.css";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/Api";
import { TrackItem, Tracks } from "@/tipes";

type Props = {
  tracksList: TrackItem[];
  isLoading: boolean;
  setTracksList: (tracks: TrackItem[]) => void;
};

export const PlayList = ({ isLoading, setTracksList, tracksList }: Props) => {
  
  return (
    <div className={classNames(styles.content__playlist, styles.playlist)}>
      <p style={{ color: "purple" }}></p>
      {tracksList.map((track) => (
        <Track
          key={track.id}
          isLoading={isLoading}
          title={track.name}
          author={track.author}
          album={track.album}
          time={track.duration_in_seconds}
        />
      ))}
    </div>
  );
};
