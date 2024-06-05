"use client";
import styles from "./Personal.module.css";
import { useContext } from "react";
import { useThemeContext } from "../../../themesComponent/ThemesComponent";
import Image from "next/image";
import Link from "next/link";
import React, { createContext, useState } from 'react';
import { UserContext } from "@/UserContext";


export const Personal = () => {
  // const { user } = useContext(UserContext);
  // if (!user) {
  //   return <div>...loading</div>
  // }
  const { theme } = useThemeContext();
  return (
    <div className={styles.sidebarPersonal}>
      <p
        className={
          theme.mode === "dark" ? styles.sidebarPersonalName : styles.light
        }
      >
        Иванов
      </p>
      <Link className={styles.sidebarIcon} href="/login">
        <Image
          alt="logout"
          src={
            "/img/logoutDark.png"
            // theme.mode === "dark" ? "img/logoutDark.png" : "img/logoutLight.png"
          }
          width={50} height={50}
        />
      </Link>
    </div>
  );
};
