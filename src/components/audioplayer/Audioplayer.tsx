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
  TrackPlayLike,
} from "../audioplayerComponents/AudioplayerComponents.jsx";
import { VolumeBlock } from "./volumeBlock/VolumeBlock.jsx";
import { TrackTime } from "./trackTime/TrackTime.jsx";
import styles from "./Audioplayer.module.css";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./progressbar/Progressbar.jsx";
import { useThemeContext } from "../../themesComponent/ThemesComponent.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDisliked,
  setIsLiked,
  setIsPlaying,
  setIsShuffle,
  setNext,
  setPrev,
} from "../../store/slices/trackSlice.js";
import { isDisabled } from "@testing-library/user-event/dist/utils/index.js";

export const Audioplayer = () => {
  const audioRef = useRef(null);
  const isPlaying = useSelector((store) => store.tracks.isPlaying);
  const currentTrack = useSelector((store) => store.tracks.currentTrack);
  const isShuffle = useSelector((store) => store.tracks.isShuffle);
  const [isLoop, setIsLoop] = useState(false);
  const dispatch = useDispatch();

  const togglePlay = () => {
    if (audioRef.current.paused) {
      // audioRef.current.play().catch((err) => console.log(err));
      dispatch(setIsPlaying(true));
    }
  };

  const togglePause = () => {
    if (audioRef.current.play) {
      audioRef.current.pause();
      dispatch(setIsPlaying(false));
    }
  };

  useEffect(() => {
    const handleEnded = () => dispatch(setNext());
    const handleLoadedMetadata = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch((err) => console.log(err));
      } else {
        audioRef.current.pause();
      }
    };
    const currentRef = audioRef.current;

    currentRef?.addEventListener("ended", handleEnded);
    currentRef?.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      currentRef?.removeEventListener("ended", handleEnded);
      currentRef?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isPlaying]);

  const playNextTrack = () => {
    dispatch(setNext());
  };

  const playPrevTrack = () => {
    if (audioRef.current.currentTime > 5) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(setPrev()); // переключаемся на предыдущий трек
    }
    // запускаем воспроизведение
  };

  const playRepeatTrack = () => {
    audioRef.current.loop = !isLoop;
    setIsLoop((prev) => !prev);
  };

  const toggleLike = () => {
    dispatch(setIsLiked(true));
  };

  const toggleDislike = () => {
    dispatch(setIsDisliked(!isDisabled));
  };

  const { theme } = useThemeContext();

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
          <div
            className={
              theme.mode === "dark" ? styles.barPlayerBlock : styles.light
            }
          >
            <div className={styles.barPlayer}>
              <div className={styles.playerControls}>
                <Prev playPrevTrack={playPrevTrack} />
                {isPlaying ? (
                  <Pause togglePause={togglePause} />
                ) : (
                  <Play togglePlay={togglePlay} />
                )}
                <Next playNextTrack={playNextTrack} />
                <Repeat playRepeatTrack={playRepeatTrack} isActive={isLoop} />
                <Shuffle
                  playShuffleTrack={() => dispatch(setIsShuffle())}
                  isActive={isShuffle}
                />
              </div>
              <TrackPlayImage />
              <div className={styles.playerTrackPlay}>
                <div className={styles.trackPlayContain}>
                  <TrackPlayAuthor name={currentTrack.name} />
                </div>
                <TrackPlayAlbum author={currentTrack.author} />
                <TrackPlayLike
                  toggleLike={toggleLike}
                  toggleDislike={toggleDislike}
                />
              </div>
            </div>
            <VolumeBlock />
          </div>
        </div>
      </div>
    </>
  );
};
