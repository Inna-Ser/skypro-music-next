"use client";
import { Centerblock } from "@components/centerblock/Centerblock";
import { Navigator } from "@components/navigator/Navigator";
import { Sidebar } from "@components/sidebar/Sidebar";
import { Audioplayer } from "@components/audioplayer/Audioplayer";
import styles from "@components/mainComponent/MainComponent.module.css";
import { useEffect, useRef, useState } from "react";
import { TrackItem, Tracks } from "@/tipes";
import { getTracks } from "@/api/Api";


export const MainComponent = () => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackItem>();
  const [tracksList, setTracksList] = useState<TrackItem[]>([]);

  useEffect(() => {
    if (audioRef.current && currentTrack?.track_file) {
      audioRef.current.src = currentTrack.track_file;
      audioRef.current.play().catch((err) => console.log(err));
      setIsPlaying(true);
    }
  }, [currentTrack]);

  useEffect(() => {
    getTracks()
      .then((data) => {
        setTracksList(data);
      })
      .catch((error) => {
        new Error(error.message);
      });
  }, [setTracksList]);
  return (
    <div className={styles.main}>
      <Navigator />
      <Centerblock setTracksList={setTracksList} tracksList={tracksList} setCurrentTrack={setCurrentTrack} />
      <Sidebar />
      <Audioplayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentTrack={currentTrack} />
    </div>
  );
};
