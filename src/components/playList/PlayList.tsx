"use client";
import classNames from "classnames";
import { Track } from "./track/Track";
import styles from "./PlayList.module.css";
import {
  setCurrentTrack,
  setPlayList,
} from "@/store/slices/features/trackSlice";
import { useEffect, useState } from "react";
import { TrackItem } from "@/tipes";
import { useAppDispatch, useAppSelector } from "@/hooks/store";

type Props ={
  filterPlaylist: TrackItem[];
}
export const PlayList = ({filterPlaylist}: Props) => {
  const [addTodoError, setAddTodoError] = useState<string | null>(null);
  const trackList = useAppSelector((state) => state.tracks.trackList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlayList({ tracks: trackList }));
  }, [dispatch, trackList]);

  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      <p style={{ color: "purple" }}>{addTodoError}</p>
      {filterPlaylist.map((track) => (
        <Track
          key={track.id}
          id={track.id}
          name={track.name}
          author={track.author}
          album={track.album}
          time={track.duration_in_seconds}
          setCurrentTrack={() => dispatch(setCurrentTrack(track))}
        />
      ))}
    </div>
  );
};
