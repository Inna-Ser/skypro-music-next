"use client";
import classNames from "classnames";
import { Track } from "./track/Track";
import styles from "./PlayList.module.css";
import { TrackItem } from "@/tipes";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCurrentTrack,
  setInitialTracks,
} from "@/store/slices/features/trackSlice";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/Api";

export const PlayList = () => {
  const [tracksList, setTracksList] = useState<TrackItem[]>([]);
  const [addTodoError, setAddTodoError] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getTracks()
      .then((data) => {
        setTracksList(data);
        dispatch(setInitialTracks(data));
      })
      .catch((error) => {
        new Error(error.message);
      });
  }, [setTracksList, setInitialTracks]);

  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      <p style={{ color: "purple" }}>{addTodoError}</p>
      {tracksList.map((track) => (
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
