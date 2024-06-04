"use client";
import { Filter } from "@components/filterItem/Filter";
import styles from "./Centerblock.module.css";
import { PlayList } from "@components/playList/PlayList";
import classNames from "classnames";
import { useThemeContext } from "../../themesComponent/ThemesComponent";
import { UserContext } from "@/userContext";

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
        <svg className={styles.playlistTitleSvg} alt="title">
          <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  );
};

const Search = () => {
  const { theme } = useThemeContext();
  return (
    <div className={classNames(styles.centerblockSearch, styles.search)}>
      <svg className={styles.searchSvg}>
        <use
          xlinkHref={
            theme.mode === "dark"
              ? "img/icon/sprite.svg#icon-search-dark"
              : "img/icon/sprite.svg#icon-search-light"
          }
        ></use>
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

export const Centerblock = ({ isLoading, setCurrentTrack }) => {
  return (
    <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter />
      <div className={styles.centerblockContent}>
        <ContentTitle />
        <UserContext.Consumer>
          {(getToken) => (
            <PlayList
              isLoading={isLoading}
              getToken={getToken}
              setCurrentTrack={setCurrentTrack}
            />
          )}
        </UserContext.Consumer>
      </div>
    </div>
  );
};
