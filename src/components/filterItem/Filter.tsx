"use client";
import { useState } from "react";
import { filterYears } from "../../utils/filterYears";
import styles from "./Filter.module.css";
import classNames from "classnames";

type Track = {
  author: string;
  year: number;
  genre: string;
  index: number;
};

type Props = {
  tracks: Track[];
};
const FilterAuthor = ({ tracks }: { tracks: Track[] }) => {
  
  return (
    <ul className={styles.filterListContaner}>
      {tracks.map(({ author, index }) => (
        <li className={styles.filterListItem} key={index}>
          {author}
        </li>
      ))}
    </ul>
  );
};

const FilterYear = ({ tracks }: { tracks: Track[] }) => {
  return (
    <ul className={styles.filterListContaner}>
      {tracks.map(({ year, index }) => (
        <li className={styles.filterListItem} key={index}>
          {year}
        </li>
      ))}
    </ul>
  );
};

const FilterGenre = ({ tracks }: { tracks: Track[] }) => {
  const arrGenre = tracks.map((item) => item.genre);
  const uniqueGenre = [...new Set(arrGenre)];
  return (
    <div className={styles.filterListGenre}>
      <ul className={styles.filterListContaner}>
        {uniqueGenre.map((genre, index) => (
          <li className={styles.filterListItem} key={index}>
            {genre}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Filter = ({ tracks }: Props) => {
  const [visible, setVisible] = useState<string | null>(null);

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
        {visible === "author" && <FilterAuthor tracks={tracks} />}
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
        {visible === "years" && <FilterYear tracks={tracks} />}
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
        {visible === "genre" && <FilterGenre tracks={tracks} />}
      </div>
    </div>
  );
};
