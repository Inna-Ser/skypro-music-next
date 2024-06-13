"use client";
import { Centerblock } from "@components/centerblock/Centerblock";
import { Navigator } from "@components/navigator/Navigator";
import { Sidebar } from "@components/sidebar/Sidebar";
import { Audioplayer } from "@components/audioplayer/Audioplayer";
import styles from "@components/mainComponent/MainComponent.module.css";
import { useEffect, useState } from "react";
import { TrackItem } from "@/tipes";
import { getTracks } from "@/api/Api";

export const MainComponent = () => {
  const [currentTrack, setCurrentTrack] = useState<TrackItem | null>();
  const [tracksList, setTracksList] = useState<TrackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getTracks()
      .then((data) => {
        setTracksList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        new Error(error.message);
        setIsLoading(false);
      });
  }, [setTracksList]);
  return (
    <div className={styles.main}>
      <Navigator />
      <Centerblock
        setTracksList={setTracksList}
        tracksList={tracksList}
        setCurrentTrack={setCurrentTrack}
      />
      <Sidebar />
      <Audioplayer />
    </div>
  );
};
