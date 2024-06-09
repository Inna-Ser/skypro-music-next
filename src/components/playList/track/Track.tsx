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
  title: string;
  author: string;
  album: string;
  genre: string;
  time: number;
  id: number;
};
export const Track = ({ isLoading, title, author, album, time, id }: Props) => {
  return (
    <div className={styles.playlistItem}>
      <div className={classNames(styles.playlistTrack, styles.track)}>
        {isLoading ? (
          <Skeleton width={"50px"} height={"50px"} baseColor="grey" />
        ) : (
          <TrackTitle title={title} id={id} />
        )}
        {isLoading ? (
          <Skeleton width={"350px"} height={"20px"} baseColor="grey" />
        ) : (
          <TrackAuthor author={author} />
        )}
        {isLoading ? (
          <Skeleton width={"305px"} height={"20px"} baseColor="grey" />
        ) : (
          <TrackAlbum album={album} />
        )}
        {isLoading ? (
          <Skeleton width={"320px"} height={"20px"} baseColor="grey" />
        ) : (
          <TrackTime time={time} />
        )}
      </div>
    </div>
  );
};
