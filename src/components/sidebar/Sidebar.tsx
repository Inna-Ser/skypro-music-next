import { Personal } from "./personal/Personal";
import { SidebarList } from "./sidebarList/SidebarList";
import classNames from "classnames";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  return (
    <div className={classNames(styles.mainSidebar, styles.sidebar)}>
        <Personal />
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
            <SidebarList />
        </div>
      </div>
    </div>
  );
};
