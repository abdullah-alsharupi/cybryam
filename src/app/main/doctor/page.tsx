"use client";
import { useGetDoctor } from "@/queries/doctors/getAllDoctors";
import React, { useState, useEffect } from "react";


import { useRouter } from "next/navigation";
import DoctorGrid from "./doctorCard";
import { doctroType } from "@/app/types/types";
import DoctorAnimate from "@/components/ui/doctorAnimate";
import DoctorCard from "./doctorCard";
import { useBlogStore } from "@/store/blog/useBlogStore";
export default function DoctorPage() {
 

  const { data ,isLoading } = useGetDoctor();
 
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<doctroType[]>([]);
  const bloggg=useBlogStore().globalBlogs

  useEffect(() => {
    if (data) {
      setFilteredDoctors(data);
    }
   
  }, [data]);
  if (isLoading) {
    return (
      <h1 className="font-serif text-center text-green-700 pt-6 ">
        {" "}
        Loading ....
      </h1>
    );
  }
  const handleSearch = () => {
    const filtered =
      data?.filter((doctor: any) => {
        const matchesSpecialty = selectedSpecialty
          ? doctor.specialist === selectedSpecialty
          : true;
        const matchesSearchTerm = doctor.doctorName.includes(searchTerm);
        return matchesSpecialty && matchesSearchTerm;
      }) || [];

    setFilteredDoctors(filtered);
   
  };

 
 console.log(bloggg)
  const specialties = Array.from(
    new Set(data?.map((doctor: any) => doctor.specialist))
  );

  return (
    <div className={`  py-2 font-serif sm:px-[5%] sm:bg-[#eeeeee]  pb-[70px] `}>
      <div className="flex justify-between max-sm:p-1  max-sm:bg-[#eeeeee] gap-2">
        <input
          placeholder="Search by Doctor Name"
          className="text-center h-[39px] w-[40%] border border-gray-300 rounded border-solid  focus:outline-none focus:ring focus:border-[#091E3A]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="text-center h-[39px] w-[40%] border bg-white border-gray-300 rounded border-solid p-2 focus:outline-none focus:ring focus:border-[#091E3A]"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option className="text-black" value="">
            All Specialists
          </option>
          {specialties.map((specialty: any, index) => (
            <option key={index} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>

        <button
          className="rounded h-[39px] w-[100px] text-white bg-[#dea94d] px-7"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="max-sm:px-[5%]">
        {filteredDoctors.length > 0 && (
          <div className={`   font-serif `}>
            <DoctorCard currentDoctors={filteredDoctors} />
          </div>
        )}
      </div>

      
    </div>
  );
}
