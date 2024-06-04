import { useEffect, useState } from "react";
import styles from "./PageLayout.module.css";
import { useSelector } from "react-redux";
import { Navigator } from "@components/navigator/Navigator";
import { Sidebar } from "@components/sidebar/Sidebar";
import { Audioplayer } from "@components/audioplayer/Audioplayer";
import { themes, useThemeContext } from "@/themesComponent/ThemesComponent";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useThemeContext();
  const currentTrack = useSelector((store) => store.tracks.currentTrack);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <div>
      <main
        style={theme.mode === "light" ? themes.light : themes.dark}
        className={styles.main}
      >
        {" "}
        <Navigator />
        <Sidebar isLoading={isLoading} />
        {children}
        {!currentTrack ? null : <Audioplayer />}
      </main>
      {!currentTrack ? null : <Audioplayer />}
      <footer className={styles.footer}></footer>
    </div>
  );
};
