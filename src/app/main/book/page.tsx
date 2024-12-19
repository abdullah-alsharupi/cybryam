"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientSchema, PatientType } from "@/app/types/validate/validate";
import { useMutation } from "@tanstack/react-query";
import { addOppo } from "@/mutations/patient/addOppo";
import { useGetDoctor } from "@/queries/doctors/getAllDoctors";
import { Doctor, doctroType } from "@/app/types/types";
import Input from "@/components/ui/inputText";
import Button from "@/components/ui/button";
import { useScroll } from "./ScrollProvider";
import { formatArabicDate } from "@/app/util/dateFormat";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // استيراد أنماط DatePicker
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import { useCookies } from "react-cookie";
import { message } from "antd";

const BookAppointment = () => {
  const { ScrollToTarget, targetRef } = useScroll();
  const { data: doctors } = useGetDoctor();
  const [cookies,setCookies]=useCookies(['PatientId','PatientName'])
  const [isSelectDate, setSelectDate] = useState(false);
  const [Days, setDays] = useState<any>([]);
  const [doctorId, setDoctorId] = useState();

  const specialties = Array.from(
    new Set(doctors?.map((doctor: any) => doctor.specialist))
  );
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialties[0]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      patName: "",
      address: "",
      phone: "",
      doctor: "",
      gender: null,
      date: null,
    },
    resolver: zodResolver(PatientSchema),
  });

  const filteredDoctors =
    doctors?.filter((doctor: any) => {
      const matchesSpecialty = selectedSpecialty
        ? doctor.specialist === selectedSpecialty
        : true;

      return matchesSpecialty;
    }) || [];

  const mutation = useMutation({
    mutationKey: ["new-book"],
    mutationFn: addOppo,
    onError: (err: any) => {
   console.log("first")
    },
    onSuccess: () => {
      reset();
      
      message.success("doctor added successfully")
    },
  });

  const onSubmit = (data: PatientType) => {
   
    if(data.patName==cookies.PatientName){
      data.id=cookies.PatientId
    }
   else data.id=''
    mutation.mutate(data);
  };
  const isDateAllowed = (date: Date) => {
    const dayNames = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    const day = dayNames[date.getDay()]; // الحصول على اسم اليوم من الكائن

    return Days?.some((schedule: any) => schedule.day === day);
  };
  const handleDoctorChange = (doctorId: string) => {
    setValue("doctor", doctorId);

   
    const selectedDoctor = doctors?.find(
      (doctor) => doctor.id === doctorId
    );
    if (selectedDoctor) {
      setDays(selectedDoctor.weekwork); // افترض أن `weekwork` تحتوي على الأيام
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full h-full">
        <div className="flex flex-row justify-end  px-8  max-lg:flex-col max-md:gap-2 max-lg:gap-2   relative  ">
          <div className="w-[50%] lg:absolute   max-lg:w-auto  left-0  ">
            <img
              src="/images/booking-female.png"
              alt="Booking Illustration"
              className="w-full lg:h-[580px] object-cover  rounded-lg"
            />
          </div>

          <div
            className="bg-[#222F66]   pt-5 pb-5 pl-8 pr-8 w-[60%]    max-lg:w-auto
           max-md:right-auto   max-lg:sticky max-lg:z-0 max-lg:items-center max-lg:right-auto max-md:z-0 z-20 flex flex-col gap-7 max-md:items-center"
            ref={targetRef}
          >
            <h2 className="text-4xl font-bold justify-center  text-white max-lg:text-xl flex gap-2">
              Book <p className="text-orange-300 "> Appointment</p>
            </h2>
            <h5 className=" text-xl w-full  text-center text-white max-md:w-[80%]">
              To reach out to our Al-Majd Hospital Team, please fill in the
              below form. Our team members will revert back to you shortly.
            </h5>

            <form className="">
              <Controller
                name="patName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      className="bg-transparent border-b border-white text-white py-2 px-0 w-full focus:outline-none"
                      placeholder="Full Name"
                      type="text"
                      {...field}
                    />
                    {error && <p className="text-red-500">{error.message}</p>}
                  </>
                )}
              />
              <select
                className="bg-transparent border-b border-white text-white  opacity-50 pl-8 py-2 px-0 w-full focus:outline-none"
                value={selectedSpecialty}
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                }}
              >
                <option value="">select Department</option>

                {specialties.map((specialty: any, index) => (
                  <option className="text-black" key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input placeholder="Phone Number" {...field} />
                    {error && <p className="text-red-500">{error.message}</p>}
                  </>
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input placeholder="Address" type="text" {...field} />
                    {error && <p className="text-red-500">{error.message}</p>}
                  </>
                )}
              />
              <Controller
                name="doctor"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <select
                      className="bg-transparent border-b border-white text-white opacity-50 pl-8 py-2 px-0 w-full focus:outline-none"
                      {...field}
                      onChange={(e) => handleDoctorChange(e.target.value)}
                    >
                      <option value="">Select Doctor</option>
                      {filteredDoctors?.map((doctor) => (
                        <option
                          key={doctor.id}
                          value={doctor.id}
                          className="text-black"
                        >
                          {doctor.doctorName}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-red-500">{error.message}</p>}
                  </>
                )}
              />
              <Controller
                name="date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div className="w-[100%] relative flex flex-col justify-between">
                    <label
                      htmlFor="datePicker"
                      className="absolute z-[999] cursor-pointer left-[10px] top-8 translate-y-[-20px] translate-x-[-5px] "
                    >
                      <img src="/icons/book.svg" />
                    </label>
                    <DatePicker
                      id="datePicker"
                      selected={field.value}
                      value={`${
                        isSelectDate ? formatArabicDate(field.value) : ""
                      }`}
                      onChange={(date) => {
                        field.onChange(date);
                        setSelectDate(true); // تحديث القيمة
                      }}
                      className="bg-transparent border-b border-white text-white py-2 pl-10 pr-0 w-full focus:outline-none"
                      minDate={new Date()} // تمنع اختيار تواريخ سابقة
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select Date"
                      filterDate={isDateAllowed}
                    />
                    {error && <p className="text-red-500">{error.message}</p>}
                  </div>
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div className="flex flex-col mt-3 pl-8">
                    <div className="flex gap-4">
                      <label className="text-white">
                        <input
                          type="radio"
                          value="male"
                          checked={field.value === "male"}
                          onChange={() => field.onChange("male")}
                          className="mr-2 text-white"
                        />
                        Male
                      </label>
                      <label className="text-white">
                        <input
                          type="radio"
                          value="female"
                          checked={field.value === "female"}
                          onChange={() => field.onChange("female")}
                          className="mr-2"
                        />
                        Female
                      </label>
                    </div>
                    {error && <p className="text-red-500">{error.message}</p>}
                  </div>
                )}
              />
            </form>
            <Button
              //@ts-ignore
              onClick={handleSubmit(onSubmit)}
              className="bg-orange-300 hover:bg-blue-600 text-4xl w-[20%] max-md:text-xl max-md:w-auto"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookAppointment;
