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
  const initialTracks = useAppSelector((state) => state.tracks.initialTracks);

  const memoize = (fn: Function) => {
    const cache: Record<string, any> = {};
    return function (...args: any[]) {
      const key = args.toString();
      if (key in cache) return cache[key];
      else {
        const result = fn(...args);
        cache[key] = result;
        return result;
      }
    };
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchString(value);
    if (value !== "") {
      dispatch(setFilter({ searchString: value, tracks: tracksList }));
    } else {
      dispatch(setFilter({ searchString: "", tracks: tracksList })); // Сбрасываем значение строки поиска в хранилище
    }
  };

  const handleClear = () => {
    console.log(tracksList)
    dispatch(setFilter({ tracks: tracksList }));
    setSearchString(""); // Сброс значения строки поиска в компоненте Search
  };

  return (
    <div className={styles.centerblockSearch}>
      <div className={styles.searchIcon}>
        <svg className={styles.searchSvg}>
          <use xlinkHref={"img/icon/sprite.svg#icon-search-dark"}></use>
        </svg>
      </div>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchString}
        onChange={handleSearchChange}
      />
      {searchString !== "" && (
        <div className={styles.clearIcon} onClick={handleClear}>
          <svg className={styles.clearSvg}>
            <use xlinkHref={"img/icon/sprite.svg#icon-close"}></use>
          </svg>
        </div>
      )}
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
