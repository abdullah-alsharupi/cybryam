"use client";

import React, { useEffect, useState } from "react";
import { Typed } from "react-typed";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Typewriter from "typewriter-effect";
interface Props {
  children?: any;
}
const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  const [isMoved, setIsMoved] = useState(false);
   

  useEffect(() => {
      // تحريك النص بعد تحميل الصفحة
      const timer = setTimeout(() => {
          setIsMoved(true);
      }, 100); // تأخير بسيط قبل الحركة

      return () => clearTimeout(timer); // تنظيف المؤقت عند إلغاء المكون
  }, []);
  return (
    <div
      className="absolute right-2 rotate-180 hidden top-1/2 transform -translate-y-1/2 hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
      onClick={onClick}
    >
      <img
        src="/icons/previous.svg"
        alt="Next"
        className="w-[22px] max-sm:w-4 max-sm:h-4 h-[22px]"
      />
    </div>
  );
};

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-20 left-1 hidden top-1/2 transform -translate-y-1/2 hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
      onClick={onClick}
    >
      <img
        src="/icons/previous.svg"
        alt="Prev"
        className="w-[22px]  max-sm:w-4 max-sm:h-4 h-[22px]"
      />
    </div>
  );
};
export const Home_navigation: React.FC<Props> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const moveDuration = 2000; // مدة الحركة بالمللي ثانية

  useEffect(() => {
      // تحريك النص بعد تحميل الصفحة
      const timer = setTimeout(() => {
          setIsMoved(true);
      }, 100); // تأخير بسيط قبل الحركة

      return () => clearTimeout(timer); // تنظيف المؤقت عند إلغاء المكون
  }, []);
  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    fade: true,

    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    autoplaySpeed: 5000,
  };

  return (
    <div className={` font-serif h-full `}>
      <div>
        <div
          className={` w-full   items-center bg-[linear-gradient(360deg,#e6eae6_60%,#232f66_50%)] justify-center`}
        >
          <div className="mx-[2%] ">
            <Slider {...settings}>
              <div className="relative ">
                <div  style={{
                   
                }}  className={` ${isMoved ? 'transform translate-x-[30%] scale-110 transition-transform duration-5000' : ''} w-[30%] max-sm:translate-x-[12%] z-10 text-balance absolute  text-[15px] flex items-center justify-center  transition-transform   flex-col text-center mx-[7%] pt-[10%] left-0 py-3 h-[100%] overflow-hidden max-xl:pt-0 `}>
                <div  className="mt-5 mr-3 md:text-[25px] bg-[#232f66] opacity-70 text-white  max-w-[400px] ">
                    <Typewriter
                      options={{
                        strings: [" Lorem ipsum dolor sit amet consectetur,"],
                        autoStart: true,
                        deleteSpeed: 1,
                        delay: 200,
                        loop: true,
                      }}
                    />
                  </div>
                  <button className="bg-[#232f66] text-white max-sm:text-[10px] rounded-2xl py-1  px-2">
                    MORE
                  </button>
                </div>
                <div className="relative overflow-hidden transition-transform duration-500 ease-in transform w-auto max-md:h-[250px] max-xl:h-[400px] max-sm:h-[200px] object-cover h-[450px]">
                  <img
                    src="/images/6.svg"
                    alt=""
                    className={`w-full max-md:h-[250px]  max-xl:h-[400px] max-sm:h-[200px] object-cover h-[520px] t${isMoved ?'ransition-transform duration-3000 ease-in transform  scale-105':''}`}
                  />
                  <div className="absolute inset-0 bg-linear-gradient  opacity-50 "></div>
                </div>
              </div>
              <div className="relative ">
                <div  style={{
                   
                }}  className={` ${isMoved ? 'transform translate-x-[50%] scale-105 transition-transform duration-5000' : ''} w-[30%] max-sm:translate-x-[12%] z-10 text-balance absolute  text-[15px] flex items-center justify-center  transition-transform   flex-col text-center mx-[7%] pt-[10%] left-0 py-3 h-[100%] overflow-hidden max-xl:pt-0 `}>
                  <div  className="mt-5 mr-3 bg-[#232f66] opacity-70 text-white  md:text-[25px] max-w-[400px] ">
                    <Typewriter
                      options={{
                        strings: [" Lorem ipsum dolor sit amet consectetur,"],
                        autoStart: true,
                        deleteSpeed: 1,
                        delay: 200,
                        loop: true,
                      }}
                    />
                  </div>
                  <button className="bg-[#232f66] text-white max-sm:text-[10px] rounded-2xl py-1  px-2">
                    MORE
                  </button>
                </div>
                <div className="relative overflow-hidden transition-transform duration-500 ease-in transform w-auto max-md:h-[250px] max-xl:h-[400px] max-sm:h-[200px] object-cover h-[450px]">
                  <img
                    src="/images/3.svg"
                    alt=""
                    className="w-full max-md:h-[250px] max-xl:h-[400px] max-sm:h-[200px] object-cover h-[520px] transition-transform duration-500 ease-in transform"
                  />
                  <div className="absolute inset-0 bg-linear-gradient  opacity-50 "></div>
                </div>
              </div>
              {/* <div className="relative">
                <div className="w-[30%] max-sm:translate-x-[12%] z-10 text-balance absolute text-[15px] flex items-center justify-center   flex-col text-center mx-[7%] pt-[10%] left-0 py-3 h-[100%] overflow-hidden max-xl:pt-0 ">
                  <div className="mt-5 mr-3 md:text-[25px] max-w-[400px] ">
                    <Typewriter
                      options={{
                        strings: [" Lorem ipsum dolor sit amet consectetur,"],
                        autoStart: true,
                        deleteSpeed: 1,
                        delay: 200,
                        loop: true,
                      }}
                    />
                  </div>
                  <button className="bg-[#232f66] text-white max-sm:text-[10px] rounded-2xl py-1  px-2">
                    MORE
                  </button>
                </div>
                <div className="relative overflow-hidden transition-transform duration-500 ease-in transform w-auto max-md:h-[250px] max-xl:h-[400px] max-sm:h-[200px] object-cover h-[450px]">
              
                  <img
                    src="/images/2.svg"
                    alt=""
                    className="w-full max-md:h-[250px] max-xl:h-[400px] max-sm:h-[200px] object-cover h-[520px] transition-transform duration-500 ease-in transform"
                  />
                  <div className="absolute inset-0 bg-linear-gradient  opacity-50 "></div>
                </div>
              </div>
              <div className="relative">
                <div className="w-[30%] max-sm:translate-x-[12%] z-10 text-balance absolute text-[15px] flex items-center justify-center   flex-col text-center mx-[7%] pt-[10%] left-0 py-3 h-[100%] overflow-hidden max-xl:pt-0 ">
                  <div className="mt-5 mr-3 md:text-[25px] max-w-[400px] ">
                    <Typewriter
                      options={{
                        strings: [" Lorem ipsum dolor sit amet consectetur,"],
                        autoStart: true,
                        deleteSpeed: 1,
                        delay: 200,
                        loop: true,
                      }}
                    />
                  </div>
                  <button className="bg-[#232f66] text-white max-sm:text-[10px] rounded-2xl py-1  px-2">
                    MORE
                  </button>
                </div>
                <div className="relative overflow-hidden transition-transform duration-500 ease-in transform w-auto max-md:h-[250px] max-xl:h-[400px] max-sm:h-[200px] object-cover h-[450px]">
              
                  <img
                    src="/images/3.svg"
                    alt=""
                    className="w-full max-md:h-[250px] max-xl:h-[400px] max-sm:h-[200px] object-cover h-[520px] transition-transform duration-500 ease-in transform"
                  />
                  <div className="absolute inset-0 bg-linear-gradient  opacity-50 "></div>
                </div>
              </div>
              <div className="relative">
                <div className="w-[30%] max-sm:translate-x-[12%] z-10 text-balance absolute text-[15px] flex items-center justify-center   flex-col text-center mx-[7%] pt-[10%] left-0 py-3 h-[100%] overflow-hidden max-xl:pt-0 ">
                  <div className="mt-5 mr-3 md:text-[25px] max-w-[400px] ">
                    <Typewriter
                      options={{
                        strings: [" Lorem ipsum dolor sit amet consectetur,"],
                        autoStart: true,
                        deleteSpeed: 1,
                        delay: 200,
                        loop: true,
                      }}
                    />
                  </div>
                  <button className="bg-[#232f66] text-white max-sm:text-[10px] rounded-2xl py-1  px-2">
                    MORE
                  </button>
                </div>
                <div className="relative overflow-hidden transition-transform duration-500 ease-in transform w-auto max-md:h-[250px] max-xl:h-[400px] max-sm:h-[200px] object-cover h-[450px]">
              
                  <img
                    src="/images/2.svg"
                    alt=""
                    className="w-full max-md:h-[250px] max-xl:h-[400px] max-sm:h-[200px] object-cover h-[520px] transition-transform duration-500 ease-in transform"
                  />
                  <div className="absolute inset-0 bg-linear-gradient  opacity-50 "></div>
                </div>
              </div> */}
            </Slider>
            <div className=" flex-col grid grid-cols-8 mt-1  justify-center max-md:grid-cols-4 max-sm:grid-cols-3 max-xl:grid-cols-5">
              {/* <div className="relative  my-6">
                <button className=" rounded-3xl pl-5 text-[#dea94d] pb-8 pt-1 bg-[#F8F8F8] w-[120px]  h-7 text-center align-middle text-[10px] font-bold">
                  BOOKING AN APPOINTMENT
                </button>

                <div className="absolute bottom-3 left-0 bg-[#dea94d] rounded-[50%] p-[6px] ">
                  <img src="/icons/book.svg" alt="" />
                </div>
              </div>
              
              <div className="relative  my-6">
                <button className=" rounded-3xl pl-5 text-[#dea94d] pb-8 pt-1 bg-[#F8F8F8] w-[120px]  h-7 text-center align-middle text-[10px] font-bold">
                  BOOKING AN APPOINTMENT
                </button>

                <div className="absolute bottom-3 left-0 bg-[#dea94d] rounded-[50%] p-[6px] ">
                  <img src="/icons/book.svg" alt="" />
                </div>
              </div>
              <div className="relative  my-6">
                <button className=" rounded-3xl pl-5 text-[#dea94d] pb-8 pt-1 bg-[#F8F8F8] w-[120px]  h-7 text-center align-middle text-[10px] font-bold">
                  BOOKING AN APPOINTMENT
                </button>

                <div className="absolute bottom-3 left-0 bg-[#dea94d] rounded-[50%] p-[6px] ">
                  <img src="/icons/book.svg" alt="" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
