"use client";
import { Centerblock } from "@components/centerblock/Centerblock";
import { Navigator } from "@components/navigator/Navigator";
import { Sidebar } from "@components/sidebar/Sidebar";
import { Audioplayer } from "@components/audioplayer/Audioplayer";
import styles from "@components/mainComponent/MainComponent.module.css";
import { useState } from "react";
import { TrackItem } from "@/tipes";

export const MainComponent = () => {
  const [currentTrack, setCurrentTrack] = useState<TrackItem | null>();
  const [tracksList, setTracksList] = useState<TrackItem[]>([]);

  return (
    <div className={styles.main}>
      <Navigator />
      <div className={styles.widthrapper}>
        <Centerblock
          setTracksList={setTracksList}
          tracksList={tracksList}
          setCurrentTrack={setCurrentTrack}
        />
      </div>
      <Sidebar />
      <Audioplayer />
    </div>
  );
};
