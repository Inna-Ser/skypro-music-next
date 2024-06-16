import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Progressbar.module.css";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>;
  togglePlay: () => void;
};
export function ProgressBar({ audioRef }: Props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressbarRef = useRef<null | HTMLInputElement>(null);

  const changeTiming = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const { value } = e.target;
      audioRef.current.currentTime = +value;
      setCurrentTime(+value);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const loadedMetadata = () => {
      if (audioRef.current) setDuration(audioRef.current.duration);
    };

    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", loadedMetadata);
      return () => {
        audioRef.current?.removeEventListener("timeupdate", updateTime);
        audioRef.current?.addEventListener("loadedmetadata", loadedMetadata);
      };
    }
  }, [audioRef]);

  useEffect(() => {
    if (progressbarRef !== null) {
      if (progressbarRef.current && duration > 0) {
        progressbarRef.current.style.backgroundSize = `${
          (currentTime / duration) * 100
        }% 100%`;
      }
    }
  }, [currentTime, duration]);

  return (
    <input
      className={styles.progressbarInput}
      ref={progressbarRef}
      type="range"
      min={0}
      max={isNaN(duration) ? undefined : duration}
      value={currentTime}
      step={0.01}
      onChange={changeTiming}
    />
  );
}
