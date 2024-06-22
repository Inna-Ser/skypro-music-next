"use client";
import { Filter } from "@components/filterItem/Filter";
import styles from "./Centerblock.module.css";
import { PlayList } from "@components/playList/PlayList";
import classNames from "classnames";
import { TrackItem } from "@/tipes";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setFilter,
  setInitialTracks,
  setIsFilteringAuthor,
  setIsFilteringGenre,
} from "@/store/slices/features/trackSlice";
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
  const [searchString, setSearchString] = useState<string>("");
  const tracksList = useAppSelector((state) => state.tracks.trackList); // Извлекаем массив треков из состояния
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchString(value);
    
    setIsFiltering(true);
    const filteredTracks = tracksList.filter((track) =>
      track.name.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(setFilter({ searchString: "", tracks: filteredTracks }));
    
  };

  const handleClear = () => {
    setIsFiltering(false);
    dispatch(setFilter({ tracks: tracksList }));
    dispatch(setInitialTracks(tracksList));
    setSearchString("");
    dispatch(
      setFilter({ searchString: "", author: [], genre: [], tracks: tracksList })
    ); // Сбрасываем все фильтры
    dispatch(setIsFilteringGenre(false));
    dispatch(setIsFilteringAuthor(false));
  };

  return (
    <div className={styles.centerblockSearch}>
      <div className={styles.searchIcon}>
        <svg className={styles.searchSvg}>
          <use xlinkHref={"img/icon/sprite.svg#icon-search-dark"}></use>
        </svg>
      </div>
      <div className={styles.searchContaner}>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
          value={searchString}
          onChange={handleSearchChange}
        />

        {isFiltering === true && (
          <div className={styles.clearIcon} onClick={handleClear}>
            <p>сбросить результаты поиска</p>
          </div>
        )}
      </div>
    </div>
  );
};

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
