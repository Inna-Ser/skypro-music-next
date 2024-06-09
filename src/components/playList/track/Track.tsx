import Skeleton from "react-loading-skeleton";
import {
  TrackAlbum,
  TrackAuthor,
  TrackTime,
  TrackTitle,
} from "../../trackComponents/TrackComponents";
import "react-loading-skeleton/dist/skeleton.css";
import classNames from "classnames";
import styles from "./Track.module.css";
import { TrackItem } from "@/tipes";

type Props = {
  isLoading: boolean;
  setCurrentTrack: (track: any) => void;
  tracks: TrackItem[];
};
export const Track = ({isLoading, setCurrentTrack, tracks} : Props) => {
  const track = tracks.length > 0 ? tracks[0] : null;

  return (
    <div onClick={setCurrentTrack} className={styles.playlistItem}>
      <div className={classNames(styles.playlistTrack, styles.track)}>
        {isLoading ? (
          <Skeleton width={"50px"} height={"50px"} baseColor="grey" />
        ) : (
          <TrackTitle title={track.title} id={track.id} />
        )}
        {isLoading ? (
          <Skeleton width={"350px"} height={"20px"} baseColor="grey" />
        ) : (
          <TrackAuthor author={track.author} />
        )}
        {isLoading ? (
          <Skeleton width={"305px"} height={"20px"} baseColor="grey" />
        ) : (
          <TrackAlbum album={track.album} />
        )}
        {isLoading ? (
          <Skeleton width={"320px"} height={"20px"} baseColor="grey" />
        ) : (
          <TrackTime time={track.time} isLiked={track.isLiked} />
        )}
      </div>
    </div>
  );
};
