"use client";
import { Filter } from "@components/filterItem/Filter";
import styles from "./Centerblock.module.css";
import { PlayList } from "@components/playList/PlayList";
import classNames from "classnames";
import { TrackItem } from "@/tipes";

const ContentTitle = () => {
  return (
    <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
      <div className={classNames(styles.playlistTitleCol, styles.col01)}>
        Трек
      </div>
      <div className={classNames(styles.playlistTitleCol, styles.col02)}>
        ИСПОЛНИТЕЛЬ
      </div>
      <div className={classNames(styles.playlistTitleCol, styles.col03)}>
        АЛЬБОМ
      </div>
      <div className={classNames(styles.playlistTitleCol, styles.col04)}>
        <svg className={styles.playlistTitleSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  );
};

const Search = () => {
  return (
    <div className={classNames(styles.centerblockSearch, styles.search)}>
      <svg className={styles.searchSvg}>
        <use xlinkHref={"img/icon/sprite.svg#icon-search-dark"}></use>
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
};

type Props = {
  tracksList: TrackItem[];
  isLoading: boolean;
  setTracksList: (track: TrackItem[]) => void;
  setCurrentTrack: (track: TrackItem) => void;
};
export const Centerblock = ({
  tracksList
}: Props) => {
  return (
    <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracksList={tracksList} />
      <div className={styles.centerblockContent}>
        <ContentTitle />
        <PlayList />
      </div>
    </div>
  );
};
