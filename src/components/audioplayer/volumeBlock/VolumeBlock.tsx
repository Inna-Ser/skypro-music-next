import classNames from "classnames";
import styles from "./VolumeBlock.module.css";

export const VolumeBlock = () => {
  return (
    <div className={classNames(styles.barVolumeBlock, styles.volume)}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg} >
            <use xlinkHref={"img/icon/sprite.svg#icon-volume-cancel-dark"}>
              /
            </use>
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles._btn)}>
          <input
            className={classNames(styles.volumeProgressLine, styles._btn)}
            type="range"
            name="range"
            // value={currentVolume * 100}
          />
        </div>
      </div>
    </div>
  );
};
