import {
  TrackTitleImg,
  TrackTitleText,
} from "./trackTitleComponent/TrackTitleComponent";
import styles from "./TrackComponents.module.css";
import classNames from "classnames";
import { Track, Tracks } from "@/tipes";

export const TrackTitle = (props: Track) => {
  return (
    <div className={styles.trackTitle}>
      <TrackTitleImg id={props.id} isPlaying={props.isPlaying} setCurrentTrack={props.setCurrentTrack} />
      <TrackTitleText title={props.title} />
    </div>
  );
};

export const TrackAuthor = (props: Tracks) => {
  return (
    <div className={styles.trackAuthor}>
      <div className={styles.trackAuthorLink}>{props.author}</div>
    </div>
  );
};

export const TrackAlbum = (props: Tracks) => {
  return (
    <div className={styles.trackAlbum}>
      <div className={styles.trackAlbumLink}>{props.album}</div>
    </div>
  );
};

export const TrackTime = (props: Props) => {
  return (
    <div className={styles.trackTime}>
      <svg
        className={styles.trackLikeSvg}
        // alt="like"
      >
        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
      </svg>
      <span className={styles.trackTimeText}>{props.time}</span>
    </div>
  );
};
