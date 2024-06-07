"use client";
import { Centerblock } from "@components/centerblock/Centerblock";
import { Navigator } from "@components/navigator/Navigator";
import { Sidebar } from "@components/sidebar/Sidebar";
import { Audioplayer } from "@components/audioplayer/Audioplayer";
import styles from "@components/mainComponent/MainComponent.module.css";
import { tracks } from "@/utils/tracks";
import { useState } from "react";

type Props = {
  tracks: Array<{
    id: number;
    title: string;
    author: string;
    album: string;
    duration_in_seconds: number;
    isLiked: boolean;
  }>;
  
};
export const MainComponent = ({tracks}: Props) => {
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
