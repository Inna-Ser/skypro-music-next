import {
  TrackTitleImg,
  TrackTitleText,
} from "./trackTitleComponent/TrackTitleComponent";
import styles from "./TrackComponents.module.css";
import { useThemeContext } from "../../themesComponent/ThemesComponent";
import { useSelector } from "react-redux";
import classNames from "classnames";

export const TrackTitle = (props) => {
  return (
    <div className={styles.trackTitle}>
      <TrackTitleImg id={props.id} />
      <TrackTitleText title={props.title} />
    </div>
  );
};

export const TrackAuthor = (props) => {
  const { theme } = useThemeContext();

  return (
    <div className={styles.trackAuthor}>
      <div
        className={
          theme.mode === "dark" ? styles.trackAuthorLink : styles.light
        }
      >
        {props.author}
      </div>
    </div>
  );
};

export const TrackAlbum = (props) => {
  return (
    <div className={styles.trackAlbum}>
      <div className={styles.trackAlbumLink}>{props.album}</div>
    </div>
  );
};

export const TrackTime = (props) => {
  const currentTrack = useSelector((store) => store.tracks.currentTrack);
  const isLiked = useSelector((store) => store.tracks.isLiked);
  const { theme } = useThemeContext();

  return (
    <div className={styles.trackTime}>
      <svg
        className={
          theme.mode === "dark"
            ? !isLiked
              ? styles.trackLikeSvg
              : classNames(styles.trackLikeSvg, styles.active)
            : !isLiked
            ? classNames(styles.trackLikeSvg, styles.light)
            : classNames(styles.trackLikeSvg, styles.lightImgActive)
        }
        alt="like"
      >
        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
      </svg>
      <span className={styles.trackTimeText}>{props.time}</span>
    </div>
  );
};
