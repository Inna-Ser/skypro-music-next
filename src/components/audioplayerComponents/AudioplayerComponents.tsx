import classNames from "classnames";
import styles from "./AudioplayerComponents.module.css";
import { useLikeTracks } from "@/hooks/likes";
import { TrackItem } from "@/tipes";

type PrevProps = {
  playPrevTrack: () => void;
};
export const Prev = ({ playPrevTrack }: PrevProps) => {
  const handleClick = () => {
    playPrevTrack();
  };
  return (
    <div className={styles.playerBtnPrev} onClick={handleClick}>
      <svg className={styles.playerBtnPrevSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
      </svg>
    </div>
  );
};

type PlayProps = {
  togglePlay: () => void;
};
export const Play = ({ togglePlay }: PlayProps) => {
  const handleClick = () => {
    togglePlay();
  };
  return (
    <div
      className={classNames(styles.playerBtnPlay, styles._btn)}
      onClick={handleClick}
    >
      <svg className={styles.playerBtnPlaySvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
      </svg>
    </div>
  );
};

type PauseProps = {
  togglePause: () => void;
};
export const Pause = ({ togglePause }: PauseProps) => {
  const handleClick = () => {
    togglePause();
  };
  return (
    <div
      className={classNames(styles.playerBtnPause, styles._btn)}
      onClick={handleClick}
    >
      <svg className={styles.playerBtnPauseSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
      </svg>
    </div>
  );
};

type NextPrpops = {
  playNextTrack: () => void;
};
export const Next = ({ playNextTrack }: NextPrpops) => {
  const handleClick = () => {
    playNextTrack();
  };
  return (
    <div className={styles.playerBtnNext} onClick={handleClick}>
      <svg className={styles.playerBtnNextSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
      </svg>
    </div>
  );
};

type RepeatProps = {
  playRepeatTrack: () => void;
  isLoop: boolean;
};
export const Repeat = ({ playRepeatTrack, isLoop }: RepeatProps) => {
  return (
    <div
      className={classNames(styles.playerBtnRepeat, styles._btnIcon)}
      onClick={playRepeatTrack}
    >
      <svg
        className={
          !isLoop
            ? styles.playerBtnShuffleSvg
            : classNames(styles.playerBtnShuffleSvg, styles.active)
        }
      >
        <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
      </svg>
    </div>
  );
};

type ShuffleProps = {
  isActive: boolean;
  toggleShuffle: () => void;
};
export const Shuffle = ({ isActive, toggleShuffle }: ShuffleProps) => {
  return (
    <div
      className={classNames(styles.playerBtnShuffle, styles._btnIcon)}
      onClick={toggleShuffle}
    >
      <svg
        className={
          !isActive
            ? styles.playerBtnShuffleSvg
            : classNames(styles.playerBtnShuffleSvg, styles.active)
        }
      >
        <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
      </svg>
    </div>
  );
};

export const TrackPlayImage = () => {
  return (
    <div className={styles.trackPlayImage}>
      <svg className={styles.trackPlaySvg}>
        <use xlinkHref={"/img/icon/sprite.svg#icon-note-dark"}></use>
      </svg>
    </div>
  );
};

type AuthorProps = {
  name: string;
};
export function TrackPlayAuthor({ name }: AuthorProps) {
  return (
    <div className={styles.trackPlayAuthor}>
      <div className={styles.trackPlayAuthorLink}>{name}</div>
    </div>
  );
}

type AlbumProps = {
  author: string;
};
export function TrackPlayAlbum({ author }: AlbumProps) {
  return (
    <div className={styles.trackPlayAlbum}>
      <div className={styles.trackPlayAlbumLink}>{author}</div>
    </div>
  );
}

type LikeProps = {
  track: TrackItem;
};
export function TrackPlayLike({ track }: LikeProps) {
  const { isLiked, handleLike } = useLikeTracks({ track });
  return (
    <div className={styles.trackPlayLikeDis}>
      <div
        className={classNames(styles.trackPlayLike, styles._btnIcon)}
        onClick={handleLike}
      >
        <svg className={styles.trackPlayLikeSvg}>
          {!isLiked ? (
            <use xlinkHref="/img/icon/sprite.svg#icon-like" />
          ) : (
            <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
          )}{" "}
        </svg>
      </div>
    </div>
  );
}
