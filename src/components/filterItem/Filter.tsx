"use client";
import { useState } from "react";
import { filterYears } from "../../utils/filterYears";
import styles from "./Filter.module.css";
import classNames from "classnames";
import { TrackItem } from "@/tipes";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFilter } from "@/store/slices/features/trackSlice";

type Props = {
  tracksList: TrackItem[];
};
const FilterAuthor = ({ tracksList }: Props) => {
  const dispatch = useAppDispatch();
  const uniqueAuthors = Array.from(
    new Set(tracksList.map((track) => track.author))
  );

  const handleAuthorChange = (autor: string) => {
    dispatch(setFilter({ author: [autor] }));
  };

  return (
    <ul className={styles.filterListContaner}>
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

const FilterGenre = ({ tracksList }: Props) => {
  const dispatch = useAppDispatch();
  const uniqueGenre = Array.from(
    new Set(tracksList.map((track) => track.genre))
  );
  const handleGenreChange = (genre: string) => {
    dispatch(setFilter({ genre: [genre] }));
  };
  return (
    <div className={styles.filterListGenre}>
      <ul className={styles.filterListContaner}>
        Expand Down
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
        {visible === "author" && <FilterAuthor tracksList={tracksList} />}
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
        {visible === "genre" && <FilterGenre tracksList={tracksList} />}
      </div>
    </div>
  );
};
