import classNames from "classnames";
import { Track } from "./track/Track";
import styles from "./PlayList.module.css";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/Api";

export const PlayList = ({ tracks, setCurrentTrack }) => {
  const [tracksList, setTracksList] = useState(Array(12));
  const [addTodoError, setAddTodoError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTracks()
      .then((data) => setTracksList(data))
      .catch((error) => {
        setAddTodoError(error.message);
      });
  }, []);

  return (
    <div className={classNames(styles.content__playlist, styles.playlist)}>
      <p style={{ color: "purple" }}>{addTodoError}</p>

      {tracksList.map((track) => (
        <Track
          id={track.id}
          setCurrentTrack={() => setCurrentTrack(track)}
          isLoading={setIsLoading}
          key={track.id}
          title={track.name}
          author={track.author}
          album={track.album}
          time={track.duration_in_seconds}
          isLiked={track.isLiked}
        />
      ))}
    </div>
  );
};
