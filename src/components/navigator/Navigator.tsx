"use client";
import { useState } from "react";
import classNames from "classnames";
import styles from "./Navigator.module.css";
import Image from "next/image";
import { BurgerLine } from "./burgerLine/BurgerLine";
import { Menu } from "./menu/Menu";
import { menu } from "@/utils/menu";

export const Navigator = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <nav className={styles.mainNav}>
      <div className={classNames(styles.navLogo, styles.logo)}>
        <Image
          className={styles.logoImage}
          src={"/img/logo.png"}
          alt="logo" width={50} height={50}
        />
      </div>{" "}
      <div
        onClick={toggleVisibility}
        className={classNames(styles.navBurger, styles.burger)}
      >
        <BurgerLine />
        <BurgerLine />
        <BurgerLine />
      </div>
      {visible && <Menu />}
    </nav>
  );
};
