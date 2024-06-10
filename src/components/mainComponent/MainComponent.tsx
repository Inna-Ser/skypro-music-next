"use client";
import { Centerblock } from "@components/centerblock/Centerblock";
import { Navigator } from "@components/navigator/Navigator";
import { Sidebar } from "@components/sidebar/Sidebar";
import { Audioplayer } from "@components/audioplayer/Audioplayer";
import styles from "@components/mainComponent/MainComponent.module.css";
import { useEffect, useState } from "react";
import { TrackItem, Tracks } from "@/tipes";
import { getTracks } from "@/api/Api";


export const MainComponent = ({tracks}: Tracks) => {
  const [currentTrack, setCurrentTrack] = useState<TrackItem>();
  const [tracksList, setTracksList] = useState<TrackItem[]>([]);

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
      <Audioplayer currentTrack={currentTrack} />
    </div>
  );
};
