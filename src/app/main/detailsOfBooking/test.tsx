"use client";

import { doctroType } from "@/app/types/types";
import {
  convertTo12HourFormat,

  formatArabicDateTime,

  formatDateTime,
} from "@/app/util/dateFormat";
import { useGetPatientsbyId } from "@/queries/patient/useGetPatientById";
import { TypeObject } from "@mui/material/styles/createPalette";
import { Doctor } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const dayMap: { [key: string]: string } = {
  الإثنين: "Monday",
  الثلاثاء: "Tuesday",
  الأربعاء: "Wednesday",
  الخميس: "Thursday",
  الجمعة: "Friday",
  السبت: "Saturday",
  الأحد: "Sunday",
};


export default function DetailsOfBooking() {
  const router=useRouter()
  const [cookie,setCookie]=useCookies(["PatientId"])
  
  const { data, refetch ,} = useGetPatientsbyId(cookie.PatientId);
  
const [doctorData,setDoctorData]=useState<doctroType>()
  useEffect(() => {
 
    if(data){
      if(data!==undefined)
      setDoctorData(data[0].doctor)
    } 
   
  }, [data]);

  const data1: { [key: string]: string } = {
    status: "Status",
    doctorName: "Doctor Name",
    patName: "Patient Name",
    createdAt: "Date Record",
    date: "Date Book",
    address: "Address",
    phone: "Phone",
    gender: "Gender",
  };

  const doctorKey:{[key:string]:string} = {
    doctorName: "Doctor Name",
    specialist: "Specialist",
    depName: "Department",
    weekwork: "Time work",
  };
 
  if(data){
    if(data==undefined)
    return <div className="flex text-center justify-center text-red-400 font-sans text-[30px] mt-[10%]">You Have Not Any Booking</div>

  }
  return (
  data&&[doctorData].length>=1  &&
    <div className="px-[7%] py-3 font-serif">
      <div className="flex  max-md:flex-col justify-center ">
        <div className="h-full  w-[80%] max-md:w-full felx justify-center bg-white rounded-xl  shadow-lg ">
          {data&& doctorData&& <div className="h-[200px] max-lg:h-[150px] max-md:h-[100px]  mx-[5%]  relative">
            <img
              src={`/images/${data &&doctorData["img"]!==null?  doctorData["img"]:'0.svg'}`}
              alt=""
              className="w-[150px] h-[150px]  max-md:h-[75px] max-md:w-[75px]  absolute object-cover max-md:bottom-[calc(50%-35px)]  max-md:top-[calc(50%-35px)] top-[calc(50%-75px)]  rounded-full"
            />

            <div className="absolute  flex  gap-2 justify-center  flex-col lg:text-[20px] max-sm:text-[12px] max-sm:left-[calc(40%)]   max-md:bottom-[calc(50%-35px)]  max-md:top-[calc(50%-35px)] bottom-[calc(50%-75px)] top-[calc(50%-75px)]    left-[calc(55%-150px)] ">
              {data &&
                Object.keys(doctorKey).map((key, index) => (
                  <div key={index}>
                    {key == "weekwork" ? (
                      <>
                        {doctorData?.weekwork.map(
                          (day: any, index: number) => (
                            <div key={index}>
                              {dayMap[day.day]}: Start{" "}
                              {convertTo12HourFormat(day.startTime)} End
                              {"  " + day.endTime}
                            </div>
                          )
                        )}
                      </>
                    ) : (
                      <>
                        {doctorData[key as keyof doctroType ]}
                        {key=='depName'&& doctorData.department["depName"]}
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>}

          <div className="">
            <div className="w-full  bg-[#232f66] flex text-center justify-center text-[20px]  text-white p-3">
              My Booking
            </div>

            <div style={{ scrollbarWidth:"thin"}} className="w-full bg-scroll flex bg-white overflow-x-auto  gap-3    text-white   px-[5%] py-10">
              {data &&
                Object.keys(data).map((indexPatient: any,index) =>
                  <div key={index}
                      className=" text-[#232f66] flex-none py-10  w-1/2 max-lg:w-full rounded-3xl shadow-lg  items-center  bg-white text-center border-[#232f66]  "
                     
                    >

                  {  Object.keys(data1).map((key,index) => (
                    <div key={index}>
                    {key!=="status"?<div className="flex flex-row py-3 px-[4%] text-[#232f66] cursor-pointer items-center justify-between" onClick={()=>{
                      setDoctorData(data[indexPatient].doctor)
                    }}
                    >
                      <div className="w-[120px] flex ">
                        { data1[key]}
                      </div>
                      <div className="">
                        {key=="createdAt" ||key=="date"? formatArabicDateTime(data[indexPatient][key]):data[indexPatient][key]}
                        {data[indexPatient].patient[key]}
                        {data[indexPatient].doctor[key]}
                      </div>
                      
                    </div>:<div className="flex text-center justify-center pb-3">
                    <div className="text-9xl relative  ">
                      <img src="/icons/test.svg" className="h-10  rounded-xl   w-[90px] object-cover" alt="" />
                      </div></div>}
                    <hr className="bg-[#232f66]" />
                    </div>
                  ))}
                  
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>  );
}
