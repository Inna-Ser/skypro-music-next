import {
  TrackTitleImg,
  TrackTitleText,
} from "./trackTitleComponent/TrackTitleComponent";
import styles from "./TrackComponents.module.css";
import classNames from "classnames";
import { TrackItem, Tracks } from "@/tipes";

type Props = {
  isLoading: boolean;
  name: string;
  author: string;
  album: string;
  genre: string;
  time: number;
  id: number;
  isPlaying: boolean;
  setCurrentTrack: () => void;
};
export const TrackTitle = ({ id, isPlaying, setCurrentTrack, name }: Props) => {
  return (
    <div className={styles.trackTitle}>
      <TrackTitleImg
        id={id}
        isPlaying={isPlaying}
        setCurrentTrack={setCurrentTrack}
      />
      <TrackTitleText title={name} />
    </div>
  );
};

export const TrackAuthor = ({ author }: Props) => {
  return (
    <div className={styles.trackAuthor}>
      <div className={styles.trackAuthorLink}>{author}</div>
    </div>
  );
};

export const TrackAlbum = ({ album }: Props) => {
  return (
    <div className={styles.trackAlbum}>
      <div className={styles.trackAlbumLink}>{album}</div>
    </div>
  );
};

export const TrackTime = ({ time }: Props) => {
  return (
    <div className={styles.trackTime}>
      <svg className={styles.trackLikeSvg} alt="like">
        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
      </svg>
      <span className={styles.trackTimeText}>{time}</span>
    </div>
  );
};
