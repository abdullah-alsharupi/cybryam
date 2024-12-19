"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // استيراد أنماط DatePicker
import React, { useState } from "react";
import { addOppo } from "@/mutations/patient/addOppo";
import { PatientSchema, PatientType } from "@/app/types/validate/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Input from "@/components/ui/inputText";
import Button from "@/components/ui/button";
import { formatArabicDate } from "@/app/util/dateFormat";
import Modal from "@/components/ui/modal";
import { message } from "antd";
import { useCookies } from "react-cookie";
import { date } from "zod";

interface Props {
  open: boolean;
  setOpenDialog: (open: boolean) => void;
  id: string;
  weekwork?: any;
}

function BookInModal({ open, setOpenDialog, id, weekwork }: Props) {

const [cookies,setCookies]=useCookies(['PatientId','PatientName'])
  const [isSelectDate, setSelectDate] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    
    reset,
  } = useForm({
    defaultValues: {
      patName: `${cookies.PatientName&&cookies.PatientName||''}`,
      address: "",
      phone: "",
      email:"",
      doctor: `${id}`,
      gender: null,
      date: null, 
    },
    resolver: zodResolver(PatientSchema),
  });

  const mutation = useMutation({
    mutationKey: ["new-book"],
    mutationFn: addOppo,
  
    onError: (err: any) => {
      console.log(err);
    },
    onSuccess: (data) => {
     
     
      reset();
      setSelectDate(false);
      message.success("add appointemnt successfully");
    },
  });

  const onSubmit = (data: PatientType) => {
    data.doctor = id;
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

    return weekwork?.some((schedule: any) => schedule.day === day);
  };

  return (
    <div className="">
      <Modal  open={open} className="w-full max-w-md" backgroundColor="#222F66">
        <div className="w-full">
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
              <Controller
              name="email"
             
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                  
                    className="bg-transparent border-b border-white text-white py-2 px-0 w-full focus:outline-none"
                    placeholder="enter your mail"
                    type="email"
                    {...field}
                  />
                  {error && <p className="text-red-500">{error.message}</p>}
                </>
              )}
            />
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
          <div className="flex flex-row-reverse justify-between w-full mt-4 items-center">
            <Button onClick={handleSubmit(onSubmit)} className="bg-orange-300">
              Book Now
            </Button>
            <Button
              label={"Close"}
              onClick={() => setOpenDialog(false)}
              className={"bg-red-700"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BookInModal;
