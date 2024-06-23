"use client";
import classNames from "classnames";
import { Track } from "./track/Track";
import styles from "./PlayList.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCurrentTrack,
  setPlayList,
} from "@/store/slices/features/trackSlice";
import { useEffect, useState } from "react";

export const PlayList: React.FC = () => {
  const [addTodoError, setAddTodoError] = useState<string | null>(null);
  const filteredTracks = useAppSelector((state) => state.tracks.filterPlaylist);
  const trackList = useAppSelector((state) => state.tracks.trackList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlayList({ tracks: trackList }));
  }, [dispatch, trackList]);

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
