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

export const Track = (props) => {
  return (
    <div onClick={props.setCurrentTrack} className={styles.playlistItem}>
      <div className={classNames(styles.playlistTrack, styles.track)}>
        {props.setIsLoading ? (
          <Skeleton width={"50px"} height={"50px"} baseColor="grey" />
        ) : (
          <TrackTitle title={props.title} id={props.id} />
        )}
        {props.setIsLoading ? (
          <Skeleton width={"350px"} height={"20px"} baseColor="grey" />
        ) : (
          <TrackAuthor author={props.author} />
        )}
        {props.setIsLoading ? (
          <Skeleton width={"305px"} height={"20px"} baseColor="grey" />
        ) : (
          <TrackAlbum album={props.album} />
        )}
        {props.setIsLoading ? (
          <Skeleton width={"320px"} height={"20px"} baseColor="grey" />
        ) : (
          <TrackTime time={props.time} isLiked={props.isLiked} />
        )}
      </div>
    </div>
  );
};
