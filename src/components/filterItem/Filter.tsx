"use client";
import { useState } from "react";
import { filterYears } from "../../utils/filterYears";
import { tracks } from "../../utils/tracks";
import styles from "./Filter.module.css";
import classNames from "classnames";
import { useThemeContext } from "../../themesComponent/ThemesComponent";

const FilterAuthor = () => {
  const { theme } = useThemeContext();
  return (
    <ul
      className={
        theme.mode === "dark" ? styles.filterListContaner : styles.light
      }
    >
      {tracks.map(({ author, index }) => (
        <li className={styles.filterListItem} key={index}>{author}</li>
      ))}
    </ul>
  );
};

const FilterYear = () => {
  const { theme } = useThemeContext();
  return (
    <ul
      className={
        theme.mode === "dark" ? styles.filterListContaner : styles.light
      }
    >
      {filterYears.map(({ year, index }) => (
        <li className={styles.filterListItem} key={index}>{year}</li>
      ))}
    </ul>
  );
};

const FilterGenre = ({ tracks }) => {
  const { theme } = useThemeContext();
  const arrGenre = tracks.map((item) => item.genre);
  const uniqueGenre = [...new Set(arrGenre)];
  return (
    <div className={styles.filterListGenre}>
      <ul
        className={
          theme.mode === "dark" ? styles.filterListContaner : styles.light
        }
      >
        {uniqueGenre.map((genre, index) => (
          <li className={styles.filterListItem} key={index}>
            {genre}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Filter = () => {
  const [visible, setVisible] = useState(null);

  const toggleVisibility = (value) => {
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
          // exact="true"
          onClick={() => toggleVisibility("author")}
        >
          исполнителю
        </div>
        {visible === "author" && <FilterAuthor />}
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
        {visible === "genre" && <FilterGenre tracks={tracks} />}
      </div>
    </div>
  );
};
