import { useSelector } from "react-redux";
import { useThemeContext } from "../../../themesComponent/ThemesComponent";
import styles from "./TrackTitleComponent.module.css";
import classNames from "classnames";

export const TrackTitleImg = (props) => {
  const { theme } = useThemeContext();
  const currentTrack = useSelector((store) => store.tracks.currentTrack);
  const isPlaying = useSelector((store) => store.tracks.isPlaying);

  return (
    <div
      className={
        theme.mode === "dark" ? styles.trackTitleImage : styles.lightImg
      }
    >
      {currentTrack?.id === props.id ? (
        <div
          className={classNames(styles.currentMarker, {
            [styles.active]: isPlaying,
          })}
        ></div>
      ) : (
        <svg className={styles.trackTitleSvg} alt="music">
          <use
            xlinkHref={
              theme.mode === "dark"
                ? "img/icon/sprite.svg#icon-note-dark"
                : "img/icon/sprite.svg#icon-note-light"
            }
          ></use>
        </svg>
      )}
    </div>
  );
};

export const TrackTitleText = (props) => {
  const { theme } = useThemeContext();
  return (
    <div className={styles.trackTitleText}>
      <a
        className={theme.mode === "dark" ? styles.trackTitleLink : styles.light}
      >
        {props.title}
        <span className={styles.trackTitleSpan}></span>
      </a>
    </div>
  );
};
