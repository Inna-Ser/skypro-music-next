import { Link } from "react-router-dom";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "./SidebarList.module.css";

export const SidebarList = ({ category, isLoading }) => {
  return (
    <ul className="sidebar__item">
      {category.map((item) =>
        isLoading ? (
          <Skeleton width={"240px"} height={"130px"} baseColor="grey" />
        ) : (
          <li key={item.id}>
            <Link to={`/category/${item.id}`}>
              <img src={item.img} alt={item.title} /> 
              <div className="sidebar__content">:</div>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};
