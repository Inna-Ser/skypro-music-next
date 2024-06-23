import classNames from "classnames";
import styles from "./AudioplayerComponents.module.css";
import { TrackItem } from "@/tipes";

type Props = {
  author: string;
  name: string;
  togglePlay: () => void;
  togglePause: () => void;
  playRepeatTrack: () => void;
  isLoop: boolean;
  isShuffle: boolean;
  isActive: boolean;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  toggleShuffle: () => void;
};
export const Prev = ({ playPrevTrack }: Props) => {
  const handleClick = () => {
    playPrevTrack();
  };
  return (
    <div className={styles.playerBtnPrev} onClick={handleClick}>
      <svg className={styles.playerBtnPrevSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
      </svg>
    </div>
  );
};

export const Play = ({ togglePlay }: Props) => {
  const handleClick = () => {
    togglePlay();
  };
  return (
    <div
      className={classNames(styles.playerBtnPlay, styles._btn)}
      onClick={handleClick}
    >
      <svg className={styles.playerBtnPlaySvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
      </svg>
    </div>
  );
};

export const Pause = ({ togglePause }: Props) => {
  const handleClick = () => {
    togglePause();
  };
  return (
    <div
      className={classNames(styles.playerBtnPause, styles._btn)}
      onClick={handleClick}
    >
      <svg className={styles.playerBtnPauseSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-pause"></use>
      </svg>
    </div>
  );
};

export const Next = ({ playNextTrack }: Props) => {
  const handleClick = () => {
    playNextTrack();
  };
  return (
    <div className={styles.playerBtnNext} onClick={handleClick}>
      <svg className={styles.playerBtnNextSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
      </svg>
    </div>
  );
};

export const Repeat = ({ playRepeatTrack, isLoop }: Props) => {
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
        <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
      </svg>
    </div>
  );
};

export const Shuffle = ({ isActive, toggleShuffle }: Props) => {
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
        <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
      </svg>
    </div>
  );
};

export const TrackPlayImage = () => {
  return (
    <div className={styles.trackPlayImage}>
      <svg className={styles.trackPlaySvg}>
        <use xlinkHref={"img/icon/sprite.svg#icon-note-dark"}></use>
      </svg>
    </div>
  );
};

export function TrackPlayAuthor({ name }: Props) {
  return (
    <div className={styles.trackPlayAuthor}>
      <div className={styles.trackPlayAuthorLink}>{name}</div>
    </div>
  );
}

export function TrackPlayAlbum({ author }: Props) {
  return (
    <div className={styles.trackPlayAlbum}>
      <div className={styles.trackPlayAlbumLink}>{author}</div>
    </div>
  );
}

export function TrackPlayLike() {
  return (
    <div className={styles.trackPlayLikeDis}>
      <div className={classNames(styles.trackPlayLike, styles._btnIcon)}>
        <svg className={styles.trackPlayLikeSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
        </svg>
      </div>
      <div className={classNames(styles.trackPlayDislike, styles._btnIcon)}>
        <svg className={styles.trackPlayDislikeSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
        </svg>
      </div>
    </div>
  );
}
