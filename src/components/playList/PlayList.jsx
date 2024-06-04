import classNames from "classnames";
import { Track } from "./track/Track";
import styles from "./PlayList.module.css";
import { useEffect, useState } from "react";
import {
  setCurrentTrack,
  setInitialTracks,
  setIsLiked,
} from "../../store/slices/trackSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllTracksQuery } from "../../services/tracks";

export const PlayList = () => {
  const [tracksList, setTracksList] = useState(Array(12));
  const [addTodoError, setAddTodoError] = useState(null);
  const dispatch = useDispatch();
  const { data } = useGetAllTracksQuery();
  const [isLoading, setIsLoading] = useState(true);
  const isLiked = useSelector((store) => store.tracks.isLiked);

  useEffect(() => {
    if (data) {
      setTracksList(data);
      dispatch(setInitialTracks(data));
      setIsLoading(false);
      dispatch(setIsLiked(false));
    }
  }, [data]);

  return (
    <div className={classNames(styles.content__playlist, styles.playlist)}>
      <p style={{ color: "purple" }}>{addTodoError}</p>

      {tracksList.map((track) => (
        <Track
          id={track.id}
          setCurrentTrack={() => dispatch(setCurrentTrack(track))}
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
