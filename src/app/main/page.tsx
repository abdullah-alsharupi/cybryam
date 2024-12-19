'use client'
import React from "react";

import Screen from "@/components/ui/Screen";
import BlogSection from "./blogSection/page";
import BookAppointment from "./book/page";
import Footer from "@/components/Footer/page";


import CenterExcellence from "./centerExcellence/page";
import WellcomeScreen from "./wellComeScreen/page";
import { Home_navigation } from "./home_navigation/page";
import RandomCardNews from "./news/RandomCardNews";
import dynamic from "next/dynamic";
import RandomCardBlogs from "./blogSection/BlogCard";

const Page = () => {
  // const NewsDaynamic=dynamic(()=>import("@/app/main/news/page"),{loading:()=><h1>loading...............</h1>,ssr:false},)
  return (
    <>
    {/* <DoctorPage /> */}
      <Home_navigation/>
      <WellcomeScreen/>
      <BookAppointment />
      <hr />
      <CenterExcellence/>
     
     
      <RandomCardNews/>
      <RandomCardBlogs />
      {/* <NewsDaynamic /> */}
    </>
  );
};

export default Page;
