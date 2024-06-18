"use client";
import { Filter } from "@components/filterItem/Filter";
import styles from "./Centerblock.module.css";
import { PlayList } from "@components/playList/PlayList";
import classNames from "classnames";
import { TrackItem } from "@/tipes";
import { useAppDispatch } from "@/store/store";
import { setFilter, setInitialTracks } from "@/store/slices/features/trackSlice";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/Api";

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
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    // Отправляем действие для обновления строки поиска в стейте
    dispatch(setFilter({ searchString }));
  };

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
        onChange={handleSearchChange}
      />
    </div>
  );
};

// type Props = {
//   tracksList: TrackItem[];
// };
export const Centerblock = () => {
  const [tracksList, setTracksList] = useState<TrackItem[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTracks()
      .then((data) => {
        setTracksList(data);
        dispatch(setInitialTracks(data));
      })
      .catch((error) => {
        new Error(error.message);
      });
  }, [setTracksList, setInitialTracks]);

  return (
    <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter />
      <div className={styles.centerblockContent}>
        <ContentTitle />
        <PlayList />
      </div>
    </div>
  );
};
