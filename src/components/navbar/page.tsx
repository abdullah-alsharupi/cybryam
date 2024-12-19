"use client";
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

import DangerDialog from "../ui/danger-dialog";
import Button from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import Menu from "../Menu/page";
import Proveiders from "@/app/providers";
interface TypeMenu {
  setShowMenu: (showMenu: boolean) => void;
}
export const ShowMenu = createContext<TypeMenu | null>(null);
export default function NavBar() {
  const [cookies, setCookies] = useCookies();
  const [showMenu, setShowMenu] = useState(false);

  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const Logout = () => {
    setCookies("next-auth.callback-url", "", { path: "/", maxAge: -1 });
    setCookies("next-auth.csrf-token", "", { path: "/", maxAge: -1 });
    signOut({ callbackUrl: "/login" });
    setOpen(true);
  };
  const Close = () => {
    setOpen(false);
  };

  return (
    <div
      className="flex justify-between bg-white z-[1] shadow-md p-[20px]"
      style={{ position: "sticky", top: 0 }}
    >
      <div className="flex  items-center gap-10">
        <span className="max-sm:hidden ">Dashboard</span>
        <button
          className="h-[30px] w-[30px] sm:hidden z-[999]"
          onClick={() => {
            setShowMenu((showMenu) => !showMenu);
          }}
        >
          <img src="/icons/menu.svg" alt="" className="h-[30px] w-[30px]" />
        </button>
        {showMenu && (
          <div className="  flex flex-col top-0 sm:hidden fixed z-[99] left-0 items-center justify-center text-black  w-[100%] bg-white py-3 ">
            <div className="pt-10 px-3">
              <hr className="z-[99] h-[1.5px] mt-2 text-red-700 bg-red-600 w-full" />
              <ShowMenu.Provider value={{ setShowMenu }}>
                <Menu/>
              </ShowMenu.Provider>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-5 z-[99] ">
        <div className="flex items-center gap-2">
          <span className="font-bold font-serif text-[16px]">
            {`مرحبا بك, ${
              (session?.user as { userName?: string })?.userName?.split(" ")[0]
            }`}
            !
          </span>
        </div>
        <DangerDialog
          content="هل تريد تسجيل الخروج حقاً"
          onClose={Close}
          onConfirm={Logout}
          open={open}
          title="تسجيل الخروج"
        ></DangerDialog>
        <Button
          label={`تسجيل الخروج`}
          onClick={() => setOpen(true)}
          className={`hover:bg-red-700 text-nowrap py-[3px]`}
        />
        {/* <img
    src="/setting.svg"
    alt="log"
    width={25}
    height={5}
    className="max-sm:hidden bg-red-700"
  /> */}
      </div>
    </div>
  );
}
