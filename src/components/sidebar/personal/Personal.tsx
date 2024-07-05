"use client";
import { useInitializeLikedTracks } from "@/hooks/likes";
import styles from "./Personal.module.css";
import Image from "next/image";
import Link from "next/link";
import React, { createContext, useState } from "react";
import { useAppSelector } from "@/hooks/store";

export const Personal = () => {
  useInitializeLikedTracks();
  const userName = useAppSelector((state) => state.auth.user?.username);

  if (!userName) {
    return null;
  }
  // const { user } = useContext(UserContext);
  // if (!user) {
  //   return <div>...loading</div>
  // }
  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>Иванов</p>
      <Link className={styles.sidebarIcon} href="/login">
        <Image
          alt="logout"
          src={"/img/logoutDark.png"}
          width={40}
          height={40}
        />
      </Link>
    </div>
  );
};
