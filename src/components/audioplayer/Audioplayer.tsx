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
import { TrackItem } from "@/tipes";

type Props = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTrack: TrackItem | null; 
};
export const Audioplayer = ({
  isPlaying,
  setIsPlaying,
  currentTrack,
}: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
        src={currentTrack.track_file}
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
                <audio ref={audioRef} src="example.mp3"></audio>
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
                  <TrackPlayAuthor
                    name={
                      currentTrack ? currentTrack.name : "No track selected"
                    }
                  />
                </div>
                <TrackPlayAlbum
                  author={currentTrack ? currentTrack.author : "Unknown"}
                />
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
