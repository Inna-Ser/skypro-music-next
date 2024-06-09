"use client";
import { Centerblock } from "@components/centerblock/Centerblock";
import { Navigator } from "@components/navigator/Navigator";
import { Sidebar } from "@components/sidebar/Sidebar";
import { Audioplayer } from "@components/audioplayer/Audioplayer";
import styles from "@components/mainComponent/MainComponent.module.css";
import { useState } from "react";
import { Tracks } from "@/tipes";


export const MainComponent = ({tracks}: Tracks) => {
  const [currentTrack, setCurrentTrack] = useState<null | any>(null);
  return (
    <div className={styles.main}>
      <Navigator />
      <Centerblock tracks={tracks} setCurrentTrack={setCurrentTrack} />
      <Sidebar />
      <Audioplayer currentTrack={currentTrack} />
    </div>
  );
};
