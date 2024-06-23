"use client";
import styles from "./Menu.module.css";
import { useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { menu } from "@/utils/menu";
import Link from "next/link";

type Props = {
  isActive: boolean, link: string, title: string 
};
const MenuItem = (props: Props) => {
  return (
    <li className={styles.menuListItem}>
      <Link
        className={classNames(styles.menuLink, {
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
  const [curentPage, setCurentPage] = useState("");
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
