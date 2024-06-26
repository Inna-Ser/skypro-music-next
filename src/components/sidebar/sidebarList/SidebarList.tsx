import React from "react";
import "./SidebarList.module.css";
import Link from "next/link";
import { categories } from "@/utils/categories";

export const SidebarList = () => {
  return (
    <ul className="sidebar__item">
      {categories.map((item) => (
        <li key={item.id}>
          <Link href={`/category/${item.id}`}>
            <img src={item.img} alt={item.title} />
            <div className="sidebar__content">:</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
