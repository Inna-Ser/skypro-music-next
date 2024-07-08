"use client";
import { Filter } from "@components/filterItem/Filter";
import styles from "./Centerblock.module.css";
import { PlayList } from "@components/playList/PlayList";
import classNames from "classnames";
import { TrackItem } from "@/tipes";
import {
  setFilter,
  setInitialTracks,
  setIsFilteringAuthor,
  setIsFilteringGenre,
} from "@/store/slices/features/trackSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";

type Props = {
  filterPlaylist: TrackItem[];
};

export const ContentTitle = () => {
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
          <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  );
};

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState<string>("");
  const tracksList = useAppSelector((state) => state.tracks.initialTracks); // Извлекаем массив треков из состояния
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const search = useAppSelector(
    (state) => state.tracks.filterOptions.searchString
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchString(value);

    setIsFiltering(true);
    const filteredTracks = tracksList.filter((track) =>
      track.name.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(setFilter({ searchString, tracks: filteredTracks }));
  };

  const handleClear = () => {
    setIsFiltering(false);
    // dispatch(setFilter({ tracks: tracksList }));
    dispatch(setInitialTracks(tracksList));
    setSearchString("");
    dispatch(setFilter({ searchString: "" })); // Сбрасываем все фильтры
    dispatch(setIsFilteringGenre(false));
    dispatch(setIsFilteringAuthor(false));
  };

  useEffect(() => {
    setSearchString(search);
  }, [search]);

  return (
    <div className={styles.centerblockSearch}>
      <div className={styles.searchIcon}>
        <svg className={styles.searchSvg}>
          <use xlinkHref={"/img/icon/sprite.svg#icon-search-dark"}></use>
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
            <p>сбросить все результаты</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const Centerblock = ({ filterPlaylist }: Props) => {
  return (
    <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
      <Filter />
      <div className={styles.centerblockContent}>
        <ContentTitle />
        <PlayList filterPlaylist={filterPlaylist} />
      </div>
    </div>
  );
};
