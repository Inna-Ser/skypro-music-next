import { TrackItem } from "@/tipes";
import styles from "./TrackTitleComponent.module.css";
import classNames from "classnames";


export const TrackTitleImg = ({ id, isPlaying, setCurrentTrack }: TrackItem) => {

  return (
    <div
      className={
        styles.trackTitleImage
      }
    >
      {setCurrentTrack?.id === id ? (
        <div
          className={classNames(styles.currentMarker, {
            [styles.active]: isPlaying,
          })}
        ></div>
      ) : (
        <svg className={styles.trackTitleSvg} >
          <use
            xlinkHref={
              "img/icon/sprite.svg#icon-note-dark"
            }
          ></use>
        </svg>
      )}
    </div>
  );
};

export const TrackTitleText = (props: Props) => {
  return (
    <div className={styles.trackTitleText}>
      <a
        className={styles.trackTitleLink}
      >
        {props.title}
        <span className={styles.trackTitleSpan}></span>
      </a>
    </div>
  );
};
