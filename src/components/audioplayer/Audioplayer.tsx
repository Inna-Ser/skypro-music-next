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
  const [currentVolume, setCurrentVolume] = useState<number>(0.5);
  const [isLoop, setIsLoop] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current && currentTrack?.track_file) {
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

  const playRepeatTrack = () => {
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
      setIsLoop((prev) => !prev);
      console.log("playRepeatTrack is called");
    }
  };

  const playNextTrack = () => {
    alert("Еще не реализовано");
    // const tracks = isShuffle ? shuffleTracks : initialTracks;
    //         const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack?.id);
    //         if (currentTrackIndex === tracks.length - 1) {
    //             return;
    //         } else {
    //             const newIndex = (currentTrackIndex + 1 + tracks.length) % tracks.length
    //             setCurrentTrack(tracks[newIndex]);            }
  };

  const playPrevTrack = () => {
    alert("Еще не реализовано");

    // if (current.currentTime > 5) {
    //   current.currentTime = 0;
    //   current.play();
    // } else {
    //   const tracks = isShuffle ? shuffleTracks : initialTracks;
    //         const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack?.id);
    //         if (currentTrackIndex === 0) {
    //             return;
    //         } else {
    //             const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
    //             currentTrack = tracks[newIndex];
    //         }; // переключаемся на предыдущий трек
    // }
    // // запускаем воспроизведение
  };

  const playShuffleTrack = () => {
    alert("Еще не реализовано");
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
                <audio ref={audioRef} src="example.mp3"></audio>
                {isPlaying ? (
                  <Pause togglePause={togglePause} />
                ) : (
                  <Play togglePlay={togglePlay} />
                )}
                <Next playNextTrack={playNextTrack} />
                <Repeat playRepeatTrack={playRepeatTrack} isLoop={isLoop} />
                <Shuffle playShuffleTrack={playShuffleTrack} />
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
