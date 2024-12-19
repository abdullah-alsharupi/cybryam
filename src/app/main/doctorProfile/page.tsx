"use client";

import { convertTo12HourFormat } from "@/app/util/dateFormat";
import { useParams, useSearchParams } from "next/navigation";
import { SetStateAction, useState } from "react";



const doctorDatas = {
  id: "2",
  doctorName: "د. سارة محمد",
  specialist: "أمراض القلب",
  department: { depName: "القلب" },
  phone: "01234567891",
  img:"img_1730661223238.png",
  information: "استشارية أمراض القلب مع خبرة 15 عامًا.",
  weekwork: [
    { startTime: "10:00", endTime: "18:00", day: "الإثنين" },
    { startTime: "10:00", endTime: "18:00", day: "الثلاثاء" }
  ]
};


const dayMap: { [key: string]: string } = {
  "الإثنين": "Monday",
  "الثلاثاء": "Tuesday",
  "الأربعاء": "Wednesday",
  "الخميس": "Thursday",
  "الجمعة": "Friday",
  "السبت": "Saturday",
  "الأحد": "Sunday"
};

// دالة لتحويل الوقت من 24 ساعة إلى 12 ساعة
interface Prop{

  Data:any
}

export default function DoctorProfile (Data:Prop) {
const doctorData=Data.Data
  const days = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"].reverse();

  const [activeTab, setActiveTab] = useState("Profile"); // الحالة النشطة
  const informationTab = ["Profile", "Experts", "Certificate/Other"];

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab); // تغيير الحالة عند النقر على زر
  };

  return (
    <div className="px-[7%] py-3 font-serif">
      <div className="flex flex-row gap-6 max-md:flex-col justify-between">
        <div className="h-[550px] w-[70%] max-md:w-full bg-white rounded-xl shadow-2xl relative">
          <div className="h-[40%]">
            <img
              src="/images/0.svg"
              alt=""
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>
          <div className="absolute rounded-full overflow-hidden border-solid border-white border-[3px] top-[28%] left-[20px] h-[100px] bg-black w-[100px]">
            <img
              src={`/images/${doctorData.img}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-[calc(28%+100px)] w-[calc(100%)]">
            <div className="ml-[20px]">
              <h1 className="font-bold">{doctorData.doctorName}</h1>
              <h1>{doctorData.specialist}</h1>
              <div className="w-[250px] text-white flex items-center mt-3 justify-center h-10 rounded bg-[#232f66]">
                BOOK AN APPOINTMENT
              </div>
            </div>
            <div className="object-fill mt-3 w-full">
              <div className="w-full h-10 bg-[#232f66] flex flex-row text-white gap-4 pl-4">
                {informationTab.map((tab, index) => (
                  <button
                    key={index}
                    className={`mt-2 px-2 rounded-t ${
                      activeTab === tab
                        ? "bg-white text-[#232f66]"
                        : "bg-transparent text-white"
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-3">
                {activeTab === "Profile" && (
                  <div>
                    {doctorData.information}
                  </div>
                )}
                {activeTab === "Experts" && (
                  <div>
                    Experts Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </div>
                )}
                {activeTab === "Certificate/Other" && (
                  <div>
                    Certificate/Other Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] max-md:w-full h-[350px] bg-white rounded-xl shadow-2xl">
          <div className="py-[3%] rounded-tr-xl rounded-tl-xl pl-4 text-white text-[20px] bg-[#232f66]">
            Booking Availability
          </div>
          <div className="flex flex-col mx-3">
            {days.map((day) => {
              const workDay = doctorData.weekwork.find((work: { day: string; }) => work.day === day);
              return (
                <div
                  key={day}
                  className={`text-white px-5 rounded my-2 w-full ${
                    workDay ? "bg-[#232f66]" : "bg-gray-500 opacity-50"
                  }`}
                >
                  {dayMap[day]} {workDay ? `(${convertTo12HourFormat(workDay.startTime)} - ${convertTo12HourFormat(workDay.endTime)})` : "No day"}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};