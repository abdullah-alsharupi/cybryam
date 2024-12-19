"use client";
import { convertTo12HourFormat } from "@/app/util/dateFormat";
import useGetDoctorById from "@/queries/doctors/useGetDoctorById";
import { dataTagSymbol } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

import { useGetDoctor } from "@/queries/doctors/getAllDoctors";

import BookInModal from "../../book/BookInModal/page";
import DoctorAnimate from "@/components/ui/doctorAnimate";
import SplietText from "@/components/ui/splietText";
import DoctorCard from "../../doctor/doctorCard";
import toast from "react-hot-toast";

const dayMap: { [key: string]: string } = {
  الإثنين: "Monday",
  الثلاثاء: "Tuesday",
  الأربعاء: "Wednesday",
  الخميس: "Thursday",
  الجمعة: "Friday",
  السبت: "Saturday",
  الأحد: "Sunday",
};

// دالة لتحويل الوقت من 24 ساعة إلى 12 ساعة
interface Prop {
  Data: any;
}

export default function DoctorProfile(Data: Prop) {
  const parms = useParams();
  const [activeTab, setActiveTab] = useState("Profile");
  const [open, setOpen] = useState(false);

  const {
    data: doctorData,
    isLoading,
    refetch,
  } = useGetDoctorById(`${parms?.id}`);

  useEffect(() => {
    refetch();
  }, []);

  const days = [
    "السبت",
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ];

  // الحالة النشطة
  const informationTab = ["Profile", "Experts", "Certificate/Other"];

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab); // تغيير الحالة عند النقر على زر
  };
  if (isLoading) {
    return (
      <h1 className="font-serif text-center text-green-700 pt-6 ">
        {" "}
        Loading ....
      </h1>
    );
  }

  return (
    <div className={`px-[7%] py-3 font-serif h-full w-full pb-20  mb-[20px]`}>
      <div className="flex flex-row gap-6 max-lg:flex-col justify-between">
        <div className="h-auto w-[70%]  max-xl:w-full max-sm:text-[15px] rounded-xl border-[2px] border-[#eeeeee] border-solid border-inherit  relative">
          <div className="h-[250px] max-xl:h-[200px] max-md:h-[150px] relative mb-[50px]">
            <img
              src="/images/0.svg"
              alt=""
              className="w-full h-full object-cover rounded-t-xl"
            />
            <div className="absolute rounded-full overflow-hidden  border-solid border-white border-[4px] top-[200px] max-md:top-[100px] max-xl:top-[150px] left-[20px] h-[100px] bg-black w-[100px]">
              <img
                src={`/images/${
                  doctorData && doctorData.img !== null
                    ? doctorData.img
                    : "0.svg"
                }`}
                alt=""
                className="w-full h-full  object-cover"
              />
            </div>
          </div>

          <div className="  bg-white">
            <div className="ml-[20px]">
              <h1 className="font-bold">د/ {doctorData?.doctorName}</h1>
              <h1>{doctorData?.specialist}</h1>
              <h1 className="opacity-70">{doctorData?.certificate}</h1>
              <button onClick={() => setOpen(true)}>
                {" "}
                <div className="px-6  text-white flex items-center mt-3 justify-center h-10 rounded bg-[#232f66]">
                  BOOK AN APPOINTMENT
                </div>
              </button>
            </div>
            <div className="mt-3 w-full ">
              <div className=" h-10 flex justify-center items-center bg-[#232f66]  text-white   ">
                Treat This States
              </div>
              <div className="p-3  overflow-y-auto rounded bg-[#fefcfc]">
                <div>
                  <SplietText
                    text={`${doctorData?.information || ""}`}
                  ></SplietText>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2xl:w-[40%] w-[30%] max-lg:w-full h-[350px] border-[2px] border-[#eeeeee] border-solid bg-white rounded-xl">
          <div className="py-[3%] rounded-tr-xl rounded-tl-xl pl-4 mx-[1px] text-white text-[20px] bg-[#232f66]">
            Booking Availability
          </div>
          <div className="flex flex-col mx-3">
            {days.map((day) => {
              const workDay = doctorData?.weekwork.find(
                (work: { day: string }) => work.day === day
              );
              return (
                <div
                  key={day}
                  className={` px-5 rounded my-2 w-full ${
                    workDay
                      ? "bg-[#232f66] text-white"
                      : "bg-gray-500 text-[#232f66] "
                  }`}
                >
                  {dayMap[day]}{" "}
                  {workDay
                    ? `(${convertTo12HourFormat(
                        workDay.startTime
                      )} - ${convertTo12HourFormat(workDay.endTime)})`
                    : "No day"}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {doctorData?.department.doctors.length > 0 && (
        <div className="text-[#182250]   font-serif">
          <h1 className="my-10 text-[20px] font-bold">Other Doctor</h1>
          <div className="">
            <DoctorCard currentDoctors={doctorData.department.doctors} />
          </div>
        </div>
      )}
      <BookInModal
        weekwork={doctorData?.weekwork}
        open={open}
        setOpenDialog={setOpen}
        id={`${parms?.id}`}
      />
    </div>
  );
}
