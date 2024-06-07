"use client";
import {
  Next,
  Pause,
  Play,
  Prev,
  Shuffle,
  TrackPlayAlbum,
  TrackPlayAuthor,
  TrackPlayImage,
} from "@/components/audioplayerComponents/AudioplayerComponents";
import { VolumeBlock } from "./volumeBlock/VolumeBlock";
import { TrackTime } from "./trackTime/TrackTime";
import styles from "./Audioplayer.module.css";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./progressbar/Progressbar";

// import { isDisabled } from "@testing-library/user-event/dist/utils/index.js";
type Props = {
  currentTrack: {
    name: string;
    author: string;
    track_file: string;
  } | null;
};
export const Audioplayer = ({currentTrack}: Props) => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isLoop, setIsLoop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.track_file;
      audioRef.current.play().catch((err) => console.log(err));
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play().catch((err) => console.log(err));
      setIsPlaying(true);
    }
  };

  const togglePause = () => {
    if (audioRef.current?.play) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        className={styles.audioControler}
        controls
        ref={audioRef}
        // src={currentTrack.track_file}
      />
      <div className={styles.bar}>
        <TrackTime audioRef={audioRef}></TrackTime>
        <div className={styles.barContent}>
          <ProgressBar
            audioRef={audioRef}
            togglePlay={togglePlay}
          ></ProgressBar>
          <div className={styles.barPlayerBlock}>
            <div className={styles.barPlayer}>
              <div className={styles.playerControls}>
                <Prev />
                {isPlaying ? (
                  <Pause togglePause={togglePause} />
                ) : (
                  <Play togglePlay={togglePlay} />
                )}
                <Next />
                {/* <Repeat playRepeatTrack={"none"} isActive={isLoop} /> */}
                <Shuffle />
              </div>
              <TrackPlayImage />
              <div className={styles.playerTrackPlay}>
                <div className={styles.trackPlayContain}>
                  <TrackPlayAuthor name={currentTrack ? currentTrack.name : "No track selected"} />
 />
                </div>
                <TrackPlayAlbum author={currentTrack ? currentTrack.author : "Unknown"} />
                {/* <TrackPlayLike
                  toggleLike={toggleLike}
                  toggleDislike={"none"}
                /> */}
              </div>
            </div>
            <VolumeBlock />
          </div>
        </div>
      </div>
    </>
  );
};
