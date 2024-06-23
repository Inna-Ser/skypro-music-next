import React from "react";
import "./SidebarList.module.css";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { TrackItem } from "@/tipes";

export const SidebarList = ({ category, isLoading }: TrackItem) => {
  return (
    <ul className="sidebar__item">
      {category.map((item) =>
        isLoading ? (
          <Skeleton width={"240px"} height={"130px"} baseColor="grey" />
        ) : (
          <li key={item.id}>
            <Link href={`/category/${item.id}`}>
              <img src={item.img} alt={item.title} /> 
              <div className="sidebar__content">:</div>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};
