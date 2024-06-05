import { Centerblock } from "@components/centerblock/Centerblock";
import { Navigator } from "@components/navigator/Navigator";
import { Sidebar } from "@components/sidebar/Sidebar";
import { Audioplayer } from "@components/audioplayer/Audioplayer";
import styles from "@components/mainComponent/MainComponent.module.css";

export const MainComponent = () => {
  return (
    <div className={styles.main}>
      <Navigator />
      <Centerblock />
      <Sidebar />
      <Audioplayer />
    </div>
  );
};
