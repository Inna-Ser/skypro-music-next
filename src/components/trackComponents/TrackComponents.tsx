import {
  TrackTitleImg,
  TrackTitleText,
} from "./trackTitleComponent/TrackTitleComponent";
import styles from "./TrackComponents.module.css";
import { useAppSelector } from "@/store/store";
import { TrackItem } from "@/tipes";


export const TrackTitle = ({ id, name }: TrackItem) => {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);

  return (
    <div className={styles.trackTitle}>
      <TrackTitleImg
        id={id}
      />
      <TrackTitleText name={name} />
    </div>
  );
};

export const TrackAuthor = ({ author }: TrackItem) => {
  return (
    <div className={styles.trackAuthor}>
      <div className={styles.trackAuthorLink}>{author}</div>
    </div>
  );
};

export const TrackAlbum = ({ album }: TrackItem) => {
  return (
    <div className={styles.trackAlbum}>
      <div className={styles.trackAlbumLink}>{album}</div>
    </div>
  );
};

export const TrackTime = ({ duration_in_seconds }: TrackItem) => {
  return (
    <div className={styles.trackTime}>
      <svg className={styles.trackLikeSvg} >
        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
      </svg>
      <span className={styles.trackTimeText}>{duration_in_seconds}</span>
    </div>
  );
};
