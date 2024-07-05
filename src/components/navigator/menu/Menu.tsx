"use client";
import styles from "./Menu.module.css";
import { useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { menu } from "@/utils/menu";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/store";
import { setFilter, setIsFilteringAuthor, setIsFilteringGenre } from "@/store/slices/features/trackSlice";

type Props = {
  isActive: boolean;
  link: string;
  title: string;
  onClick: (link: string) => void;
};
const MenuItem = ({ onClick, isActive, link, title }: Props) => {
  const handleClick = () => {
    onClick(link);
  };
  return (
    <li className={styles.menuListItem}>
      <Link
        className={classNames(styles.menuLink, {
          [styles.active]: isActive,
        })}
        href={link}
        onClick={handleClick}
      >
        {title}
      </Link>
    </li>
  );
};

export const Menu = () => {
  const [curentPage, setCurentPage] = useState("");
  const dispatch = useAppDispatch();
  
  const handleItemClick = (link: string) => {
    dispatch(
      setFilter({ searchString: "" })
    ); // Сбрасываем все фильтры
    dispatch(setIsFilteringGenre(false));
    dispatch(setIsFilteringAuthor(false));
    setCurentPage(link);
  };

  return (
    <div className={styles.navigatorMenu}>
      <ul className={styles.menuList}>
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            link={item.link}
            title={item.title}
            isActive={curentPage === item.link}
            onClick={handleItemClick}
          />
        ))}
        <button
          className={styles.menuButtonChangeTheme}
          // onClick={handleClick}
        >
          <Image
            src={"/img/icon/dark.svg"}
            alt="cheng_theme"
            style={{ cursor: "pointer" }}
            width={39}
            height={39}
          />
        </button>
      </ul>
    </div>
  );
};
