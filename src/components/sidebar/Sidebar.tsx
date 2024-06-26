import Skeleton from "react-loading-skeleton";
import { Personal } from "./personal/Personal";
import { SidebarList } from "./sidebarList/SidebarList";
import { categories } from "../../utils/categories";
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
