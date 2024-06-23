import Skeleton from "react-loading-skeleton";
import { Personal } from "./personal/Personal";
import { SidebarList } from "./sidebarList/SidebarList";
import { categories } from "../../utils/categories";
import classNames from "classnames";
import styles from "./Sidebar.module.css";

export const Sidebar = (props) => {
  return (
    <div className={classNames(styles.mainSidebar, styles.sidebar)}>
      {props.isLoading ? (
        <Skeleton
          width={"240px"}
          height={"70px"}
          baseColor="transparent"
          highlightColor="transparent"
        />
      ) : (
        <Personal />
      )}
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          {props.isLoading ? (
            <Skeleton width={"240px"} height={"130px"} baseColor="grey" />
          ) : (
            <SidebarList category={categories} />
          )}
        </div>
      </div>
    </div>
  );
};
