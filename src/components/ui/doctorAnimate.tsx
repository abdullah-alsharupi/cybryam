"use client";
import React, { useEffect, useState } from "react";
import { formatPhoneNumber } from "@/app/util/phoneFormat";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import BookInModal from "@/app/main/book/BookInModal/page";
import { useGetDoctor } from "@/queries/doctors/getAllDoctors";
import { doctroType } from "@/app/types/types";
interface Doctor {
  id: string;
  doctorName: string;
  specialist: string;
  phone: string;
  information?: string;
  img: string;
}

interface DoctorGridProps {
  currentDoctors: any;
}
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
const DoctorAnimate = ({ currentDoctors }: DoctorGridProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>("");
  const [currentPage, setCurrentPage] = useState(1);
  const settings = {
    dots: true,
   
    infinite: currentDoctors && currentDoctors.length > 3,
    
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    slidesToShow: Math.min(currentDoctors ? currentDoctors.length==1?2:currentDoctors.length : 0, 3), // عدد العناصر بناءً على ما هو متاح
    slidesToScroll: Math.min(currentDoctors ? currentDoctors.length : 0, 3),
    rows: currentDoctors.length<=3?1:2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(currentDoctors ? currentDoctors.length==1?2:currentDoctors.length : 0, 2),
          slidesToScroll: Math.min(currentDoctors ? currentDoctors.length : 0, 2),
          rows: currentDoctors.length<=2?1:2,
        },
      },
     
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(currentDoctors ? currentDoctors.length : 0, 2),
          slidesToScroll: Math.min(currentDoctors ? currentDoctors.length : 0, 2),
          rows:  2, // تعديل عدد الصفوف حسب عدد العناصر
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows:currentDoctors ? currentDoctors.length : 1, // تعديل عدد الصفوف حسب عدد العناصر
        },
      },
    ],
  };
  return (
    <div className="h-full  mt-[30px] font-serif">
      <div className="h-full ">  
        <Slider {...settings}>
          {currentDoctors?.map((doctor: any, index: number) => (
            <div className="p-1" key={index}>
              <div className="shadow-2xl  bg-white rounded-xl  border-solid   ">
                <div className="flex flex-row max-md:flex-col justify-center items-center max-xl:gap-3 p-4 max-xl:items-center gap-5 w-full h-auto">
                  <div className="rounded-full overflow-hidden  h-[130px] w-[130px]">
                    <img
                      src={`/images/${
                        doctor && doctor.img !== null ? doctor.img : "0.svg"
                      }`}
                      alt=""
                      className="w-full h-full object-cover overflow-hidden"
                    />
                  </div>
                  <div className="flex-1 max-md:flex max-md:flex-col max-md:items-center">
                    <h1 className="text-[#222F66] font-bold  w-full overflow-hidden">
                      {doctor?.doctorName}
                    </h1>
                    <h4 className="text-xl ">{doctor?.specialist}</h4>
                    <h4 className="opacity-50 overflow-hidden max-h-16 text-wrap">
                      {doctor?.information}
                    </h4>
                  </div>
                </div>

                <hr className="my-1 border border-solid" />
                <div className="flex flex-col gap-4 pl-5 h-[100px]">
                  <h4>{formatPhoneNumber(doctor?.phone)}</h4>
                  <div className="flex justify-around max-md:text-[12px] text-black">
                    <button
                      onClick={() => {
                        router.push(`/main/doctorProfile/${doctor?.id}`);
                      }}
                      className="bg-white text-black px-2 text-nowrap hover:bg-blue-500 border border-solid"
                    >
                      Doctor Profile
                    </button>

                    <Button
                      label="Book Appointment"
                      className="text-white "
                      onClick={() => {
                        //@ts-ignore
                        setId({
                          id: `${doctor.id}`,
                          weekwork: doctor?.weekwork,
                        });
                        setOpen(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        {open && (
          <BookInModal
            open={open}
            setOpenDialog={setOpen}
            weekwork={id?.weekwork}
            id={id?.id}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorAnimate;
