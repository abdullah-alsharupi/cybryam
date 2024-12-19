"use client";
import Home from "./Home/page";

import { apifetch } from "@/api";

import React, { createContext, useEffect, useState } from "react";

import { signOut, useSession } from "next-auth/react";
import NavBar from "@/components/navbar/page";
import Menu from "@/components/Menu/page";
import { NextRequest } from "next/server";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router=useRouter()
  const { data: session } = useSession();
  useEffect(()=>{
    if(session?.user){
      if(!session.user)
      router.push('/login')
    }
    
  },[])

  // const Authorization = async () => {
  //   if (session?.user) {
  //     const response = await apifetch.get(`/auth/login`, {
  //       headers: { Authorization: `Bearer ${session?.user?.email}` },
  //     });

  //     if (
  //       JSON.stringify(response.data[0].permissions) !==
  //       JSON.stringify((session.user as { permissions: string }).permissions)
  //     ) {
  //       await signOut({ callbackUrl: "/login" });
  //     }
  //   }
  // };

  // Authorization();
  let height = 700;
  if (typeof window !== "undefined") {
    height = window.screen.height / 5 + 10;
  }
  return (
    <div>
      {session?.user && (
        <>
          <div
            style={{ height: `${4 * height}px` }}
            className={`flex bg-slate-200  w-[100%] h-[${height}px] font-serif`}
          >
            <div
              className="font-sans shadow-lg  text-black p-1 flex-flex4 flex max-sm:w-[82%] flex-col h-[100%] "
              dir="rtl"
            >
              <NavBar />

              <div className="px-2  mt-[10px] bg-slate-200 w-[100%]">
                {children}
              </div>
            </div>
            <div className="rounded-tr-[10px]  rounded-tl-[10px] max-sm:hidden max-sm:cursor-pointer  rounded-br-[10px] border-solid border-white  border-[10px] bg-white w-[18%] ">
              <Menu />
            </div>{" "}
          </div>
        </>
      )}
    </div>
  );
}
