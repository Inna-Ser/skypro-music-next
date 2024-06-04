import { useEffect, useRef, useState } from "react";
import styles from "./Progressbar.module.css";

export function ProgressBar({ audioRef, togglePlay }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressbarRef = useRef(null);

  const changeTiming = (e) => {
    const { value } = e.target;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
    togglePlay();
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const loadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", loadedMetadata);
      return () => {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.addEventListener("loadedmetadata", loadedMetadata);
      };
    }
  }, [audioRef]);

  useEffect(() => {
    if (progressbarRef.current && duration > 0) {
      progressbarRef.current.style.backgroundSize = `${
        (currentTime / duration) * 100
      }% 100%`;
    }
  }, [currentTime, duration]);

  return (
    <input
      className={styles.progressbarInput}
      ref={progressbarRef}
      type="range"
      min={0}
      max={duration}
      value={currentTime}
      step={0.01}
      onChange={changeTiming}
      $color="#b672ff"
    />
  );
}
