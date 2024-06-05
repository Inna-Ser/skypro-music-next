"use client";
import { useRouter } from "next/router";
import styles from "./Menu.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { useThemeContext } from "@/themesComponent/ThemesComponent";
import { menu } from "@/utils/menu";
import Link from "next/link";

const MenuItem = (props) => {
  const { theme } = useThemeContext();
  return (
    <li className={styles.menuListItem}>
      <Link
        className={classNames(styles.menuLink, styles[theme.mode], {
          [styles.active]: props.isActive,
        })}
        href={props.link}
        // exact
      >
        {props.title}
      </Link>
    </li>
  );
};

export const Menu = () => {
  const { theme, toggleTheme } = useThemeContext();
  const [curentPage, setCurentPage] = useState("");

  // useEffect(() => {
  //   const location = useRouter();
  //   setCurrentPage(location.pathname);
  // }, []);

  // const handleClick = () => {
  //   toggleTheme(theme);
  // };

  return (
    <div className={styles.navigatorMenu}>
      <ul className={styles.menuList}>
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            link={item.link}
            title={item.title}
            isActive={curentPage === item.link}
          />
        ))}
        <button className={styles.menuButtonChangeTheme} 
        // onClick={handleClick}
        >
          <Image
            src={
              theme.mode === "dark"
                ? "/img/icon/dark.svg"
                : "/img/icon/light.svg"
            }
            alt="cheng_theme"
            style={{ cursor: "pointer" }}
            width={50}
            height={50}
          />
        </button>
      </ul>
    </div>
  );
};
