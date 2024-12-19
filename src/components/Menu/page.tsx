"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { menu } from "./data";
import { ShowMenu } from "../navbar/page";
import { useSession } from "next-auth/react";


export default function Menu() {
  const { data: session } = useSession();
  const showMenu = useContext(ShowMenu);
  const [colorNavBar, setColorNavBar] = useState("home");
  const permission = (session?.user as { permissions: any }).permissions;

  return (
    <div className="text-black font-serif  font-bold text-[20px] bg-white w-full">
      <div className="rounded-xl ml-[10px] mr-[10px]    py-[5px] px-[5px] border-solid   max-lg:hidden mt-[8%] bg-[#222F66]">
        <h1 className="text-white rounded-sm text-center">Dashboard</h1>
      </div>
      <div className="flex flex-wrap w-full justify-between">
        {menu.map((item, index) => {
          // تحقق من الأذونات
          const isHidden =
            permission.find(
              (perm: any) =>
                perm.page === item.permissionPage &&
                perm.actions === "إخفاء الصفحة"
            ) ||
            ((session?.user as { role: string }).role === "user" &&
              item.title === "المستخدمين");

          return (
          
            <div
              className={`${
                colorNavBar == item.title
                  ? "bg-gray-200 shadow-xl shadow-curret text-[25px]"
                  : "hover:shadow-2xl hover:shadow-current hover:bg-gray-50"
              }   w-full max-sm:w-1/3 max-sm:flex hover:scale-110 transition-transform duration-500 justify-around`}
              key={index}
              onClick={() => {
                setColorNavBar(item.title);
                showMenu?.setShowMenu(false);
              }}
            >
              <Link
                style={{
                  pointerEvents: isHidden ? "none" : "auto",
                  color: isHidden ? "gray" : "inherit",
                }}
                href={item.url}
                className="flex items-center"
              >
                <div className="text-center p-2 max-sm:text-[18px]  w-full">
                  {item.title}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
