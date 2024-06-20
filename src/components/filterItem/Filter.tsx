"use client";
import { useCallback, useMemo, useState } from "react";
import { filterYears } from "../../utils/filterYears";
import styles from "./Filter.module.css";
import classNames from "classnames";
import { TrackItem } from "@/tipes";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFilter, setIsFiltering, setIsFilteringAuthor, setIsFilteringGenre } from "@/store/slices/features/trackSlice";
import Image from "next/image";

type Props = {
  tracksList: TrackItem[];
  memoize: <T extends (...args: any[]) => any>(fn: T) => T;
  closeDropdown: () => void;
};
const FilterAuthor = ({ closeDropdown, memoize, tracksList }: Props) => {
  const dispatch = useAppDispatch();

  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(tracksList.map((track) => track.author)));
  }, [tracksList]);

  const handleAuthorChange = memoize(
    useCallback(
      (author: string) => {
        dispatch(setFilter({ author: [author], tracks: tracksList })); // Передаем author как массив строк и tracksList
        dispatch(setIsFilteringAuthor(true));
        closeDropdown();
        null;
      },
      [dispatch, tracksList, closeDropdown]
    )
  );

  const toggleReset = () => {
    dispatch(setFilter({ author: [], tracks: tracksList })); // Сбрасываем фильтр по автору
    dispatch(setIsFilteringAuthor(false));
    closeDropdown();
  };

  return (
    <ul className={styles.filterListContaner}>
      <p className={styles.resetAuthor} onClick={toggleReset}>
        Filter reset
      </p>
      {uniqueAuthors.map((author, index) => (
        <li
          className={styles.filterListItem}
          key={index}
          onClick={() => {
            handleAuthorChange(author);
          }}
        >
          {author}
        </li>
      ))}
    </ul>
  );
};

type Props = {
  memoize: <T extends (...args: any[]) => any>(fn: T) => T;
};
const FilterYear = ({ memoize }: Props) => {
  const dispatch = useAppDispatch();

  const handleYearChange = memoize(
    useCallback(
      (year: string) => {
        dispatch(setFilter({ order: year }));
      },
      [dispatch]
    )
  );

  return (
    <ul className={styles.filterListContaner}>
      {filterYears.map((filterYear, index) => (
        <li
          className={styles.filterListItem}
          key={index}
          onClick={() => {
            handleYearChange(filterYear.year);
          }}
        >
          {filterYear.year}
        </li>
      ))}
    </ul>
  );
};

type Props = {
  tracksList: TrackItem[];
  memoize: <T extends (...args: any[]) => any>(fn: T) => T;
  closeDropdown: () => void;
};
const FilterGenre = ({ closeDropdown, memoize, tracksList }: Props) => {
  const dispatch = useAppDispatch();

  const uniqueGenre = useMemo(() => {
    return Array.from(new Set(tracksList.map((track) => track.genre)));
  }, [tracksList]);

  const handleGenreChange = memoize(
    useCallback(
      (genre: string) => {
        dispatch(setFilter({ genre: [genre], tracks: tracksList }));
        dispatch(setIsFilteringGenre(true));
        closeDropdown();
      },
      [dispatch, tracksList]
    )
  );

  const toggleReset = () => {
    dispatch(setFilter({ genre: [], tracks: tracksList })); // Сбрасываем фильтр по жанру
    dispatch(setIsFilteringGenre(false));
    closeDropdown();
  };

  return (
    <div className={styles.filterListGenre}>
      <ul className={styles.filterListContaner}>
        <p className={styles.resetAuthor} onClick={toggleReset}>
          Filter reset
        </p>{" "}
        {uniqueGenre.map((genre, index) => (
          <li
            className={styles.filterListItem}
            key={index}
            onClick={() => handleGenreChange(genre)}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Filter = () => {
  const [visible, setVisible] = useState<string | null>(null);
  const tracksList = useAppSelector((state) => state.tracks.trackList);
  const setIsFilteringAuthor = useAppSelector((state) => state.tracks.isFilteringAuthor);
  const setIsFilteringGenre = useAppSelector((state) => state.tracks.isFilteringGenre);
  const filteredTrackCount = useAppSelector(
    (state) => state.tracks.filterPlaylist.length
  );

  function memoize(fn) {
    const cache = {};

    return function (...args) {
      const key = args.toString();

      if (key in cache) return cache[key];
      else {
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
      }
    };
  }
  const toggleVisibility = (value: string | null) => {
    if (value === visible) {
      setVisible(null);
    } else {
      setVisible(value);
    }
  };

  const closeDropdown = () => {
    setVisible(null);
  };

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={styles.filterWrapper}>
        {setIsFilteringAuthor && ( // Отображение currentMarker только если isFiltering === true
          <div className={styles.currentMarker}>{filteredTrackCount}</div>
        )}
        <div
          className={
            visible === "author"
              ? `${styles.filterButton} ${styles.active}`
              : styles.filterButton
          }
          onClick={() => toggleVisibility("author")}
        >
          исполнителю
        </div>
        {visible === "author" && (
          <FilterAuthor
            tracksList={tracksList}
            memoize={memoize}
            closeDropdown={closeDropdown}
          />
        )}
      </div>
      <div className={styles.filterWrapper}>
        <div
          className={
            visible === "years"
              ? classNames(styles.filterButton, styles.active)
              : styles.filterButton
          }
          onClick={() => toggleVisibility("years")}
        >
          году выпуска
        </div>
        {visible === "years" && <FilterYear memoize={memoize} />}
      </div>
      <div className={styles.filterWrapper}>
        {setIsFilteringGenre && (
          <div className={styles.currentMarker}>{filteredTrackCount}</div>
        )}
        <div
          className={
            visible === "genre"
              ? classNames(styles.filterButton, styles.active)
              : styles.filterButton
          }
          onClick={() => toggleVisibility("genre")}
        >
          жанру
        </div>
        {visible === "genre" && (
          <FilterGenre
            tracksList={tracksList}
            memoize={memoize}
            closeDropdown={closeDropdown}
          />
        )}
      </div>
    </div>
  );
};
