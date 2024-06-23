"use client";
import { Centerblock } from "@components/centerblock/Centerblock";
import { Navigator } from "@components/navigator/Navigator";
import { Sidebar } from "@components/sidebar/Sidebar";
import { Audioplayer } from "@components/audioplayer/Audioplayer";
import styles from "@components/mainComponent/MainComponent.module.css";
import { useState } from "react";
import { TrackItem } from "@/tipes";
import { useAppSelector } from "@/store/store";

export const MainComponent = () => {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const [tracksList, setTracksList] = useState<TrackItem[]>([]);

  return (
    <div className={styles.main}>
      <Navigator />
      <div className={styles.widthrapper}>
        <Centerblock tracksList={tracksList} />
      </div>
      <Sidebar />
      {!currentTrack ? null : <Audioplayer />}{" "}
    </div>
  );
};
