"use client";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[-5%] rotate-180  top-1/2 transform max-sm:hidden -translate-y-1/2 hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
      onClick={onClick}
    >
      <img src="/icons/previous.svg" alt="Next" className="w-[22px] h-[22px]" />
    </div>
  );
};

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-20  left-[-5%] top-1/2 transform -translate-y-1/2 max-sm:hidden  hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
      onClick={onClick}
    >
      <img src="/icons/previous.svg" alt="Prev" className="w-[22px] h-[22px]" />
    </div>
  );
};
export default function Department() {
  const { data: departmentData } = useGetDepartments();
  const settings = {
    dots: true,
   
    infinite: departmentData && departmentData.length > 3,
    
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    slidesToShow: Math.min(departmentData ? departmentData.length==1?2:departmentData.length : 0, 3), // عدد العناصر بناءً على ما هو متاح
    slidesToScroll: Math.min(departmentData ? departmentData.length : 0, 3),
    rows: departmentData?.length<=3?1:2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(departmentData ? departmentData.length==1?2:departmentData.length : 0, 2),
          slidesToScroll: Math.min(departmentData ? departmentData.length : 0, 2),
          rows: departmentData?.length<=2?1:2,
        },
      },
     
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(departmentData ? departmentData.length : 0, 2),
          slidesToScroll: Math.min(departmentData ? departmentData.length : 0, 2),
          rows:  2, 
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows:1, // تعديل عدد الصفوف حسب عدد العناصر
        },
      },
    ],
  };

  const router = useRouter();

 

  return (
    departmentData && (
      <div className="px-[5%]  mb-[70px]">
        <div className="w-full text-balance text-center py-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper
          ultrices sed adipiscing malesuada aliquam nisl fusce sit. Scelerisque
          suspendisse amet semper volutpat odio. Risus faucibus interdum
          volutpat nibh feugiat lectus nulla ullamcorper porttitor purus enim.
          Volutpat mattis venenatis.
        </div>
        <div className=" font-serif  items-center content-center  py-7 ">
        <Slider {...settings}>
        {departmentData.map((item: any, index: number) => (
            <button
              key={index}
              onClick={() => router.push(`/main/department/about/${item?.depName}`)}
            >
              <div className="relative rounded-3xl flex flex-col items-center w-full h-full px-1 pb-5  py-[6%]">
               <div className="shadow-xl rounded-3xl overflow-hidden">
               <img
                  src={`/images/${item.img?item.img:'1.jpg'}`}
                  className="rounded-3xl w-[380px] h-[240px] object-cover"
                  alt={item.depName}
                />
               </div>
                <div className="absolute bottom-[calc(-1%+10px)] rounded-xl w-[80%] max-w-[300px]  bg-white shadow-md p-[10px] text-center">
                  {item.depName}
                </div>
              </div>
            </button> 
          ))}
        </Slider>
         
         
        </div>
       
      </div>
    )
  );
}
