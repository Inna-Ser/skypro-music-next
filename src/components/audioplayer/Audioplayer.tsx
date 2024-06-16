"use client";
import {
  Next,
  Pause,
  Play,
  Prev,
  Repeat,
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
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setIsPlaying,
  setIsShuffle,
  setNext,
  setPrev,
} from "@/store/slices/features/trackSlice";

export const Audioplayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentVolume, setCurrentVolume] = useState<number>(0.5);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

  useEffect(() => {
    if (audioRef.current && currentTrack?.track_file) {
      audioRef.current.src = currentTrack.track_file;
      audioRef.current.load(); // Загружаем новый трек
      audioRef.current.play().catch((err) => console.log(err));
      dispatch(setIsPlaying(true));
    }
  }, [currentTrack, dispatch]);

  useEffect(() => {
    const handleEnded = () => dispatch(setNext());
    const handleLoadedMetadata = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch((err) => console.log(err));
      } else {
        audioRef.current?.pause();
      }
    };
    const currentRef = audioRef.current;
    currentRef?.addEventListener("ended", handleEnded);
    currentRef?.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      currentRef?.removeEventListener("ended", handleEnded);
      currentRef?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isPlaying, dispatch]);

  const playNextTrack = () => {
    dispatch(setNext());
  };

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play().catch((err) => console.log(err));
      dispatch(setIsPlaying(true));
    } else {
      audioRef.current?.pause();
      dispatch(setIsPlaying(false));
    }
  };

  const playRepeatTrack = () => {
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
      setIsLoop((prev) => !prev);
      console.log("playRepeatTrack is called");
    }
  };

  const playPrevTrack = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime > 5) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        dispatch(setPrev()); // переключаемся на предыдущий трек
      }
    }
  };

  const toggleShuffle = () => {
    dispatch(setIsShuffle(!isActive));
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = currentVolume; // Устанавливаем начальное значение громкости
    }
  }, [audioRef, currentVolume]);

  return (
    <>
      <audio
        loop={isLoop}
        ref={audioRef}
        src={currentTrack?.track_file}
        className={styles.audioControler}
        controls
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
                <Prev playPrevTrack={playPrevTrack} />
                {isPlaying ? (
                  <Pause togglePause={togglePlay} />
                ) : (
                  <Play togglePlay={togglePlay} />
                )}
                <Next playNextTrack={playNextTrack} />
                <Repeat playRepeatTrack={playRepeatTrack} isLoop={isLoop} />
                <Shuffle toggleShuffle={toggleShuffle} isActive={isShuffle} />
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
            <VolumeBlock
              setCurrentVolume={setCurrentVolume}
              currentVolume={currentVolume}
            />
          </div>
        </div>
      </div>
    </>
  );
};
