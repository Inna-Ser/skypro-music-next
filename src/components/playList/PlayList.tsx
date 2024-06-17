"use client";
import classNames from "classnames";
import { Track } from "./track/Track";
import styles from "./PlayList.module.css";
import { TrackItem } from "@/tipes";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCurrentTrack,
  setInitialTracks,
  setPlayList,
} from "@/store/slices/features/trackSlice";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/Api";

export const PlayList = () => {
  const [addTodoError, setAddTodoError] = useState(null);
  const filteredTracks = useAppSelector((state) => state.tracks.filterTracks);
  const trackList = useAppSelector((state) => state.tracks.trackList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlayList({ tracks: filteredTracks }));
  }, [dispatch, filteredTracks]);

  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      <p style={{ color: "purple" }}>{addTodoError}</p>
      {filteredTracks.map((track) => (
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
