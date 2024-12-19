"use client";
import { formatShortDateTime } from "@/app/util/dateFormat";

import { useEffect, useState } from "react";

import { useGetPatientsbyId } from "@/queries/patient/useGetPatientById";
import { useCookies } from "react-cookie";
import { doctroType, Oppontement } from "@/app/types/types";



interface Prop {
  Data: any;
}

export default function DetailsBook(Data: Prop) {
  const bookingkey: { [key: string]: string } = {
    status: "Status",
    doctorName: "Doctor Name",
    patName: "Patient Name",
    createdAt: "Date Record",
    date: "Date Book",
    address: "Address",
    phone: "Phone",
    gender: "Gender",
  };

  const [cookie, setCookie] = useCookies(["PatientId"]);

  const { data, refetch, isLoading } = useGetPatientsbyId(cookie?.PatientId);


  const [doctorData, setDoctorData] = useState<doctroType>();
  useEffect(() => {
    refetch()
    if (data) {
      if (data.length !== 0) setDoctorData(data[0].doctor);
    }
  }, [data,cookie.PatientId]);

  if (data) {
    if (data.length === 0)
      return (
        <div className="flex text-center justify-center text-red-400 font-sans text-[30px] mt-[10%]">
          You Have Not Any Booking
        </div>
      );
  }
  return (
  
    
    <div className={`px-[7%] py-3 font-serif h-full w-full pb-20`}>
      <div className="flex  justify-center">
        <div className="h-[730px] max-md:h-[650px] w-[80%] max-md:w-full  rounded-xl border-[2px] border-[#eeeeee] border-solid border-inherit  relative">
          {doctorData && (
            <div className="h-[30%] max-sm:h-[20%]">
              <img
                src={`/images/${
                  doctorData && doctorData["img"] !== null
                    ? doctorData["img"]
                    : "0.svg"
                }`}
                alt=""
                className="w-full h-full object-cover rounded-t-xl"
              />
            </div>
          )}

          {doctorData && (
            <div className="absolute  overflow-hidden  border-solid max-sm:top-[12%]  top-[20%] left-[20px]">
              <div className="ml-[20px]">
                <h1
                  style={{
                    textShadow:
                      ".5px .5px 0 #000, -.5px -.5px 0 #000, .5px -.5px 0 #000,-.5px .5px 0 #000",
                  }}
                  className=" text-white text-[20px] "
                >
                  {doctorData?.doctorName}
                </h1>
                <h1
                  style={{
                    textShadow:
                      ".5px .5px 0 #000, -.5px -.5px 0 #000, .5px -.5px 0 #000,-.5px .5px 0 #000",
                  }}
                  className="text-white"
                >
                  {doctorData?.specialist}
                </h1>
              </div>
            </div>
          )}
          <div className=" max-xl:top-[calc(19%+110px)]  w-[calc(100%)] bg-white">
            <div className="">
              <div className="w-full  bg-[#232f66] flex text-center justify-center text-[20px]  text-white p-3">
                My Booking
              </div>

              <div
                style={{ scrollbarWidth: "thin" }}
                className="w-full bg-scroll flex bg-white overflow-x-auto  gap-3    text-white   px-[5%] py-5"
              >
                {data &&
                  Object.keys(data).map((indexPatient: any, index) => (
                    <div
                      key={index}
                      className=" text-[#232f66] flex-none   w-1/2 max-lg:w-full  shadow-lg  items-center  bg-white text-center border-[#232f66]  "
                    >
                      {Object.keys(bookingkey).map((key, index) => (
                        <div key={index}>
                          {key !== "status" ? (
                            <div
                              className="flex flex-row py-3 px-[4%] text-[#232f66] cursor-pointer items-center justify-between"
                              onClick={() => {
                                setDoctorData(data[indexPatient].doctor);
                              }}
                            >
                              <div className="w-[120px] flex ">
                                {bookingkey[key]}
                              </div>
                              <div className="">
                                {key == "createdAt" || key == "date"
                                  ? formatShortDateTime(data[indexPatient][key])
                                  : data[indexPatient][key]}
                                {data[indexPatient].patient[key]}
                                {data[indexPatient].doctor[key]}
                              </div>
                            </div>
                          ) : (
                            <div className="flex text-center justify-center pb-3">
                              <div className="relative  ">
                                <img
                                  src={`/icons/${
                                    data[indexPatient][key] &&
                                    data[indexPatient][key] !== null
                                      ? `${data[indexPatient][key]}.svg`
                                      : "PENDING.svg"
                                  }`}
                                  className="h-10  rounded-xl   w-[90px] object-cover"
                                  alt=""
                                />
                              </div>
                            </div>
                          )}
                          <hr className="bg-[#232f66]" />
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
