'use client'
import Button from "@/components/ui/button";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/input";
import { message } from "antd";
import { Oppontement } from "@/app/types/types";
import { AppointUpdateSchema, PatientSchema } from "@/app/types/validate/validate";
import { UpdateAppointment } from "@/mutations/oppo/UpdateAppointment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatArabicDate } from "@/app/util/dateFormat";

interface AppointmentUpdateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
  appointmentData: Oppontement;
}

 const AppointmentUpdate = ({
  isOpen,
  appointmentData,
  setIsOpen,
  refetch,
}: AppointmentUpdateProps) => {
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AppointUpdateSchema),
    defaultValues: {
      patId: "",
      docId: "",
      status: "",
      patName: "",
      date: new Date(),
    },
  });
  const [isSelectDate, setSelectDate] = useState(false);

 
  useEffect(() => {
    if (appointmentData) {
      setValue("patName", appointmentData.patient.patName || "");
      setValue("docId", appointmentData.doctor.id || "");
      setValue("patId", appointmentData.patient.id || "");
      setValue("status", appointmentData.status || "");
    }
  }, [appointmentData, setValue]);

 
  const mutation = useMutation({
    mutationKey: ["update-appointment"],
    mutationFn: UpdateAppointment,
    onError: (err: any) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      setIsOpen(false);
      refetch();
      message.success("تم تعديل الموعد بنجاح");
    },
  });

  const onSubmit = (appointment: any) => {
    mutation.mutate(appointment);
  };

  return (
    <div dir="rtl">
      <Modal open={isOpen}>
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          تحديث موعد
        </h2>
        <form
          dir="rtl"
          className="grid grid-cols-2  gap-2  font-serif font-normal text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
        
        <div>
        <label htmlFor="patientId" className="block font-medium mb-2">
              التاريخ
            </label>
         
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="w-[100%] relative flex flex-col justify-between">
                  <label
                    htmlFor="datePicker"
                    className="absolute z-[999] cursor-pointer left-[10px] top-8 translate-y-[-20px] translate-x-[-5px] "
                  >
                    <img src="/icons/books.svg" />
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
                    className=" border border-black  py-2 px-4 pl-10 rounded-[11px] text-black  w-full focus:outline-none"
                    minDate={new Date()} // تمنع اختيار تواريخ سابقة
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Date"
                  />
                  {error && <p className="text-red-500">{error.message}</p>}
                </div>
              )}
            />
        </div>

          <div className="mb-4">
            <label htmlFor="patientId" className="block font-medium mb-2">
              المريض
            </label>
            <Controller
              name="patName"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="patientId"
                  {...field}
                  placeholder="ادخل معرف المريض"
                />
              )}
            />
            {errors.patName && (
              <span className="text-red-500 text-[16px]">
                {errors.patName.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block font-medium mb-2">
              الحالة
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select
                  id="status"
                  {...field}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                >
                  <option value="">{appointmentData.status}</option>
                  <option value="CONFIRMED">مؤكد</option>
                  <option value="CANCELLED">ملغي</option>
                  <option value="PENDING">قيد الانتظار</option>
                </select>
              )}
            />
            {errors.status && (
              <span className="text-red-500 text-[16px]">
                {errors.status.message}
              </span>
            )}
          </div>
          <Controller
            name="docId"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <Controller
            name="patId"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <div className="col-span-2 flex justify-between items-center">
            <Button
              label={"تحديث"}
              type="submit"
              className={`w-[70px]`}
            />
            <Button
              label={"إلغاء"}
              onClick={() => setIsOpen(false)}
              className={`w-[70px] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AppointmentUpdate;