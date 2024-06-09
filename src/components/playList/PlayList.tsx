"use client";
import classNames from "classnames";
import { Track } from "./track/Track";
import styles from "./PlayList.module.css";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/Api";
import { TrackItem, Tracks } from "@/tipes";

type Props = {
  tracks: Tracks;
  tracksList: TrackItem[];
  setTracksList: (tracks: TrackItem[]) => void;
};

export const PlayList = ({ tracks, setTracksList, tracksList }: Props) => {
  const [addTodoError, setAddTodoError] = useState<string | null>(null);

  useEffect(() => {
    getTracks()
      .then((data) => {
        setTracksList(data);
        setAddTodoError(null); // Сброс ошибки, если запрос успешно выполнен
      })
      .catch((error) => {
        setAddTodoError(error.message);
      });
  }, []);

  return (
    <div className={classNames(styles.content__playlist, styles.playlist)}>
      {addTodoError && <p style={{ color: "purple" }}>{addTodoError}</p>}
      {tracksList.map((track) => (
        <Track
          key={track.id}
          isLoading={track.isLoading}
          setCurrentTrack={track.setCurrentTrack}
          title={track.title}
          author={track.author}
          album={track.album}
          time={track.duration_in_seconds}
        />
      ))}
    </div>
  );
};
