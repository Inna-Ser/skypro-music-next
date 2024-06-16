"use client";
import { TrackItem } from "@/tipes";
import styles from "./TrackTitleComponent.module.css";
import classNames from "classnames";
import { useAppSelector } from "@/store/store";

export const TrackTitleImg = ({ id }: TrackItem) => {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);

  return (
    <div className={styles.trackTitleImage}>
      {currentTrack?.id === id? (
        <div
          className={classNames(styles.currentMarker, {
            [styles.active]: isPlaying,
          })}
        ></div>
      ) : (
        <svg className={styles.trackTitleSvg}>
          <use xlinkHref={"img/icon/sprite.svg#icon-note-dark"}></use>
        </svg>
      )}
    </div>
  );
};

export const TrackTitleText = ({ name }: TrackItem) => {
  return (
    <div className={styles.trackTitleText}>
      <a className={styles.trackTitleLink}>
        {name}
        <span className={styles.trackTitleSpan}></span>
      </a>
    </div>
  );
};
