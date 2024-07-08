"use client";
import React from "react";
import "./SidebarList.module.css";
import Link from "next/link";
import { categories } from "@/utils/categories";
import { useAppDispatch } from "@/hooks/store";
import {
  setFilter,
  setIsFilteringAuthor,
  setIsFilteringGenre,
} from "@/store/slices/features/trackSlice";

export const SidebarList = () => {
  const dispatch = useAppDispatch();

  const handleItemClick = () => {
    dispatch(setFilter({ searchString: "" })); // Сбрасываем все фильтры
    dispatch(setIsFilteringGenre(false));
    dispatch(setIsFilteringAuthor(false));
  };
  return (
    <ul className="sidebar__item">
      {categories.map((item) => (
        <li key={item.id} onClick={handleItemClick}>
          <Link href={`/tracks/category/${item.id}`}>
            <img src={item.img} alt={item.title} />
            <div className="sidebar__content">:</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
