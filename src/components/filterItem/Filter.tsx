"use client";
import { useCallback, useMemo, useState } from "react";
import { filterYears } from "../../utils/filterYears";
import styles from "./Filter.module.css";
import classNames from "classnames";
import { TrackItem } from "@/tipes";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFilter } from "@/store/slices/features/trackSlice";

type Props = {
  tracksList: TrackItem[];
  memoize: <T extends (...args: any[]) => any>(fn: T) => T;
};
const FilterAuthor = ({ memoize, tracksList }: Props) => {
  const dispatch = useAppDispatch();

  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(tracksList.map((track) => track.author)));
  }, [tracksList]);

  const handleAuthorChange = memoize(
    useCallback(
      (author: string) => {
        dispatch(setFilter({ author: [author], tracks: tracksList })); // Передаем author как массив строк и tracksList
      },
      [dispatch, tracksList]
    )
  );

  const toggleReset = () => {
    dispatch(setFilter({ author: [], tracks: tracksList })); // Сбрасываем фильтр по автору
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
  tracksList: TrackItem[];
  memoize: <T extends (...args: any[]) => any>(fn: T) => T;
};
const FilterYear = () => {
  const dispatch = useAppDispatch();

  const handleYearChange = (year: string) => {
    dispatch(setFilter({ order: year }));
  };
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
};
const FilterGenre = ({ memoize, tracksList }: Props) => {
  const dispatch = useAppDispatch();

  const uniqueGenre = useMemo(() => {
    return Array.from(new Set(tracksList.map((track) => track.genre)));
  }, [tracksList]);

  const handleGenreChange = memoize(
    useCallback(
      (genre: string) => {
        dispatch(setFilter({ genre: [genre], tracks: tracksList }));
      },
      [dispatch, tracksList]
    )
  );

  const toggleReset = () => {
    dispatch(setFilter({ genre: [], tracks: tracksList })); // Сбрасываем фильтр по жанру
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

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={styles.filterWrapper}>
        <div
          className={
            visible === "author"
              ? classNames(styles.filterButton, styles.active)
              : styles.filterButton
          }
          onClick={() => toggleVisibility("author")}
        >
          исполнителю
        </div>
        {visible === "author" && (
          <FilterAuthor tracksList={tracksList} memoize={memoize} />
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
        {visible === "years" && <FilterYear />}
      </div>
      <div className={styles.filterWrapper}>
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
          <FilterGenre tracksList={tracksList} memoize={memoize} />
        )}
      </div>
    </div>
  );
};
