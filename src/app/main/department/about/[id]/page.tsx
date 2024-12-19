"use client";
import DoctorCard from "@/app/main/doctor/doctorCard";
import DoctorGrid from "@/app/main/doctor/doctorCard";
import DoctorAnimate from "@/components/ui/doctorAnimate";
import SplietText from "@/components/ui/splietText";
import useGetDepartmentById from "@/queries/department/useGetDepartmentById";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-2 rotate-180  top-1/2 transform -translate-y-1/2 hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
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
      className="absolute z-20 left-1  top-1/2 transform -translate-y-1/2 hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
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
export default function AboutDepartment() {
  const settings = {
    infinite: true,

    slidesToShow: 1,
    fade: true,

    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const departmentId = useParams().id;
  const {
    data: doctorsData,
    refetch,
    isLoading,
  } = useGetDepartmentById(`${departmentId}`);

  useEffect(() => {
    refetch();
  }, []);

  return (
    doctorsData?.length>0 && (
      <>
       
          <div className="font-serif">
            <div className="h-[300px] max-md:h-[150px] relative">
              <div className="absolute left-[10%] lg:text-[30px] font-bold bottom-1/2">
                {doctorsData[0].depName}
              </div>
              <img
                src={`/images/${
                  doctorsData[0].img ? doctorsData[0].img : "1.jpg"
                }`}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="px-[5%]  bg-white">
              <div className="pb-10 pt-4">
                <h1 className="text-center font-bold text-[25px]">
                  Cases We Treatment
                </h1>
                <SplietText
                  text={`${doctorsData[0]?.description || ""}`}
                ></SplietText>
              </div>
              {doctorsData[0].doctors.length > 0 && (
                <div className="pb-[70px]">
                  <h1 className="text-[#182250] text-[20px] font-bold  font-serif  mb-5">
                    Our Doctors
                  </h1>

                  <DoctorCard
                    currentDoctors={doctorsData[0].doctors}
                    key={`${departmentId}`}
                  />
                </div>
              )}
            </div>
          </div>
        
      </>
    )
  );
}
