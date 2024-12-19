"use client";
import { useGetHospital } from "@/queries/hospital/useGetHospital";
import React from "react";

const WellcomeScreen = () => {
const {data:hostpitaldate}=useGetHospital()

  return (hostpitaldate&&
    <>
      {/* <div className="flex justify-center top-0 items-center mt-[3%] absolute inset-x-11 z-[999]">
        <div className="w-0 h-0 border-t-[50px] border-r-[50px] border-l-[50px] border-solid border-x-transparent border-t-white"></div>
      </div> */}
      <div className="bg-[#eeee] h-auto font-serif pb-4 mt-[0%]">
        <div className="flex flex-row-reverse max-md:flex-col-reverse max-md:p-0  justify-around ">
          <div className="relative w-[50%] max-md:w-full h-[400px]  max-lg:h-[330px] max-sm:h-[250px] ">
            <div className="rounded-tl-[30%] rounded-br-[30%]   w-[40%] bg-[#967a13ee] opacity-55 h-[40%] absolute bottom-0 left-0 inset-x-0"></div>
            <img
              src="/images/4.svg"
              alt=""
              className="w-[100%] h-[400px]  max-lg:h-[330px] max-sm:h-[250px] object-cover max-md:bottom-0 max-md:top-0"
            />
          </div>

          <div className="w-[50%] max-md:w-full flex items-center ">
            <div>
              <div className="py-[4%]">
                {" "}
                <h1 className="text-[36px] font-[400px] font-serif text-center">
                  {" "}
                  Welcome to
                </h1>
                <h1 className="text-[36px] font-[400px] text-[#D8B36A] font-serif h-full text-center">
                  {" "}
                  Almajed Hospital
                </h1>
              </div>
              <div className="h-full py-5 text-center px-[3%]">
               {hostpitaldate[0].description}
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi doloremque aspernatur repudiandae. Culpa deserunt sed quas soluta eligendi impedit aut nemo autem corrupti eaque fugiat exercitationem ea quasi, optio neque!
              </div>
            </div>
          </div>
        </div>

        <div className=" pt-20 grid grid-cols-2 h-auto gap-[100px] justify-around font-serif px-10 max-sm:px-4 max-sm:grid-cols-1">
        <div className="rounded-tl-[30%]  relative  rounded-br-[30%] shadow-lg      w-full  bg-white border-solid border-white border-r-[3px] border-y-[1px]  h-auto  bottom-0 left-0 inset-x-0">
          
          <img src="/images/6.svg" alt="" className="rounded-tl-[30%] w-full h-[150px]   rounded-br-[30%] object-cover" />
            <div className="absolute top-[-40px] h-auto w-[100px] px-7 rounded-tl-[50%] max-sm:left-[calc(50%-25px)] left-[calc(50%-50px)] rounded-tr-[50%] bg-white border-solid border-white text-[20px] border-[3px] ">
              رؤيتنا
            </div>
           <h1 className="py-4 px-2">
        
        {hostpitaldate[0]?.vision}         </h1>
          </div>

          <div className="rounded-tl-[30%]  relative  rounded-br-[30%] shadow-lg      w-full  bg-white border-solid border-white border-r-[3px] border-y-[1px]  h-auto  bottom-0 left-0 inset-x-0">
          
          <img src="/images/0.svg" alt="" className="rounded-tl-[30%]  w-full h-[150px]   rounded-br-[30%] object-cover" />
            <div className="absolute top-[-40px] h-auto w-[100px] px-7 rounded-tl-[50%] max-sm:left-[calc(50%-25px)] left-[calc(50%-50px)] rounded-tr-[50%] bg-white border-solid border-white text-[20px] border-[3px] ">
              رسالتنا
            </div>
           <h1 className="py-4 px-2">
         {hostpitaldate[0].description} 
          </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default WellcomeScreen;
