import classNames from "classnames";
import styles from "./VolumeBlock.module.css";
import { useState } from "react";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>;
  setCurrentVolume: (volume: number) => void;
  currentVolume: number;
};
export const VolumeBlock = ({
  setCurrentVolume,
  currentVolume,
  audioRef,
}: Props) => {
  const [isMute, setIsMute] = useState<boolean>(false);

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = e.target.valueAsNumber / 100;
    setCurrentVolume(newVolume);
    if (audioRef && audioRef.current) {
      audioRef.current.volume = newVolume; // Обновляем громкость аудиоэлемента
    }
    if (newVolume === 0) {
      setIsMute(true);
    } else {
      setIsMute(false);
    }
  };

  const mute = () => {
    setIsMute((prevIsMute) => {
      const newIsMute = !prevIsMute;
      if (newIsMute) {
        setCurrentVolume(0);
      } else {
        setCurrentVolume(0.5); // Можно сохранить предыдущее значение громкости и восстановить его
      }
      return newIsMute;
    });
  };
  return (
    <div className={classNames(styles.barVolumeBlock, styles.volume)}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage} onClick={mute}>
          <svg className={styles.volumeSvg}>
            <use
              xlinkHref={
                isMute
                  ? "img/icon/sprite.svg#icon-volume-cancel-dark"
                  : "img/icon/sprite.svg#icon-volume-dark"
              }
            >
              /
            </use>
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles._btn)}>
          <input
            className={classNames(styles.volumeProgressLine, styles._btn)}
            type="range"
            name="range"
            value={isMute ? 0 : currentVolume * 100} // Значение ползунка: 0, если режим "без звука", иначе текущее значение громкости
            onChange={changeVolume}
          />
        </div>
      </div>
    </div>
  );
};
