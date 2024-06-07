import { useEffect, useState } from "react";
import styles from "./TrackTime.module.css";

export const TrackTime = ({ audioRef }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [audioRef]);
  
    const timeToString = (time) => {
      time = Math.round(time);
      let minutes = String(Math.trunc(time / 60)).padStart(2, "0");
      let seconds = String(time % 60).padStart(2, "0");
      return `${minutes}:${seconds}`;
    };
  
    return (
      <div className={styles.trackTimeComponent}>
        {timeToString(currentTime)} / {timeToString(duration)}
      </div>
    );
  };