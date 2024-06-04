import { NavLink } from "react-router-dom";
import styles from "./Personal.module.css";
import { useContext } from "react";
import { UserContext } from "../../../userContext";
import { useThemeContext } from "../../../themesComponent/ThemesComponent";
import Image from "next/image";

export const Personal = () => {
  const { user } = useContext(UserContext);
  const { theme } = useThemeContext();
  return (
    <div className={styles.sidebarPersonal}>
      <p
        className={
          theme.mode === "dark" ? styles.sidebarPersonalName : styles.light
        }
      >
        {user.username}
      </p>
      <NavLink className={styles.sidebarIcon} to="/login">
        <Image
          alt="logout"
          src={
            theme.mode === "dark" ? "img/logoutDark.png" : "img/logoutLight.png"
          }
        />
      </NavLink>
    </div>
  );
};
