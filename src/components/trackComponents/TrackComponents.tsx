import {
  TrackTitleImg,
  TrackTitleText,
} from "./trackTitleComponent/TrackTitleComponent";
import styles from "./TrackComponents.module.css";
import { TrackItem } from "@/tipes";
import { useAppSelector } from "@/hooks/store";
import { useLikeTracks } from "@/hooks/likes";

export const TrackTitle = ({ id, name }: TrackItem) => {

  return (
    <div className={styles.trackTitle}>
      <TrackTitleImg id={id} />
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
type Props = {
  duration_in_seconds: number;
  track: TrackItem;
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export const TrackTime = ({ duration_in_seconds, track }: Props) => {
  const { isLiked, handleLike } = useLikeTracks({ track });
  const formattedTime = formatTime(duration_in_seconds);

  return (
    <div className={styles.trackTime}>
      <svg className={styles.trackLikeSvg} onClick={handleLike}>
        {!isLiked ? (
          <use xlinkHref="/img/icon/sprite.svg#icon-like" />
        ) : (
          <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
        )}
      </svg>
      <span className={styles.trackTimeText}>{formattedTime}</span>
    </div>
  );
};
