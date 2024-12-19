"use client";

import { message } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import { useEffect, useState } from "react";
import useGetDoctorById from "@/queries/doctors/useGetDoctorById";
import { doctorZodSchema, doctroType } from "@/app/types/types";
import { doctroUpdate } from "@/mutations/doctors/updateDoctor";
import { useCookies } from "react-cookie";
import WeekDayInput from "./WeekDayInput";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";

interface updatDoctroProps {
  setUpdating: (isOpen: boolean) => void;
  isUpdating: boolean;
  doctorData?: any;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
}

const daysOfWeek = [
  "السبت",
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
];

export default function UpdateDoctor({
  isUpdating,
  setUpdating,
  doctorData,
  refetch,
}: updatDoctroProps) {
  const { data: dataDepartment } = useGetDepartments();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const id = doctorData?.id;
  const [doctroImageUrl, setdoctroImageUrl] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<doctroType>({
    resolver: zodResolver(doctorZodSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weekwork",
  });

  useEffect(() => {
    if (doctorData) {
      const {
        doctorName,
        specialist,
        phone,
        department,
        weekwork,
        information,
      } = doctorData;
      const workinghour = Object.values(
        weekwork.reduce((acc: any, item: any) => {
          if (!acc[item.day]) {
            acc[item.day] = {
              day: item.day,
              workinghour: [],
            };
          }

          acc[item.day].workinghour.push({
            endTime: item.endTime,
            startTime: item.startTime,
          });

          return acc;
        }, {})
      );
      setValue("weekwork", (workinghour as any) || []); // تعيين قيمة weekwork
      setValue("doctorName", doctorName || "");
      setValue("specialist", specialist || "");
      setValue("phone", phone || "");
      setValue("department.depName", department?.depName || "");
      setValue("information", information || "");

      if (doctorData.img) {
        setdoctroImageUrl(`/images/${doctorData.img}`);
      }
    }
  }, []);

  const mutation = useMutation({
    mutationKey: ["update-Doctor"],
    mutationFn: (data: doctroType) => doctroUpdate(data, id),
    onError: (err: any) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      refetch();
      setUpdating(false);
      message.success("تم تعديل بيانات الدكتور بنجاح");
    },
  });

  const onSubmit = (data: doctroType) => {
    const formData = new FormData();
    formData.append("doctorName", data.doctorName);
    formData.append("specialist", data.specialist);
    if (data.img == null) {
      if (doctorData.img == null) formData.append("img", "");
      else formData.append("img", doctorData.img);
    } else {
      if (doctorData.img !== null) {
        const nameImg = `${doctorData.img}`; // اسم الملف الجديد

        formData.append("nameImg", nameImg);
        formData.append("img", data.img);
      } else {
        formData.append("nameImg", "");
        formData.append("img", data.img);
      }
    }
    formData.append("phone", data.phone);
    formData.append("information", data.information as any);
    if (data.department) {
      formData.append("department[depName]", data.department.depName);
    }

    const originalData = data.weekwork.flatMap((item) =>
      item.workinghour.map((hour) => ({
        day: item.day,
        endTime: hour.endTime,
        startTime: hour.startTime,
      }))
    );
    formData.append("workinghour", JSON.stringify(originalData));

    mutation.mutate(formData as any);
  };

  return (
    <div dir="rtl">
      <Modal open={isUpdating} width={600} className="w-[600px] top-[1%]">
        <div className="text-2xl font-bold mb-4  max-sm:text-[18px] sm:mb-4 font-serif text-center">
          تحديث بيانات الدكتور
          <h1 className="text-red-700 ">{doctorData?.doctorName}</h1>
        </div>
        <form
          dir="rtl"
           className="grid sm:grid-cols-7 max-sm:gap-x-2 gap-2 max-sm:mb-3 max-sm:text-[15px] font-serif sm:font-normal sm:text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="sm:mb-4 sm:col-span-3 max-sm:col-span-5 ">
            <label htmlFor="doctorName" className="block font-medium mb-2">
              الاسم
            </label>
            <Controller
              defaultValue=""
              name="doctorName"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="doctorName"
                  {...field}
                  placeholder="ادخل اسم الدكتور"
                />
              )}
            />
            {errors.doctorName && (
              <span className="text-red-500 text-[16px]">
                {errors.doctorName.message}
              </span>
            )}
          </div>

          <div className="sm:mb-4 sm:col-span-2 max-sm:col-span-1">
            <label htmlFor="specialist" className="block font-medium mb-2">
              التخصص
            </label>
            <Controller
              defaultValue=""
              name="specialist"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="specialist"
                  {...field}
                  placeholder="ادخل التخصص"
                />
              )}
            />
            {errors.specialist && (
              <span className="text-red-500 text-[16px]">
                {errors.specialist.message}
              </span>
            )}
          </div>
          <div className=" sm:mb-4 sm:col-span-2 max-sm:col-span-4">
            <label htmlFor="depName" className="block font-medium mb-2">
              اسم القسم
            </label>
            <Controller
              defaultValue=""
              name="department.depName"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full  border-[2px] border-[#cacfd5] rounded-[7px]  md:py-[10px] md:px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                >
                  <option>{"إختر القسم"}</option>
                  {dataDepartment?.map((depart: any,index:number) => (
                    <option key={index} value={depart.depName.trim()}>
                      {depart.depName}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.department?.depName && (
              <span className="text-red-500 text-[16px]">
                {errors.department.depName.message}
              </span>
            )}
          </div>
          <div className=" sm:mb-4 sm:col-span-2 max-sm:col-span-3">
            <label htmlFor="phone" className="block font-medium mb-2">
              رقم الهاتف
            </label>
            <Controller
              defaultValue=""
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="phone"
                  {...field}
                  placeholder="ادخل رقم الهاتف"
                />
              )}
            />
            {errors.phone && (
              <span className="text-red-500 text-[16px]">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className=" sm:col-span-5 sm:mb-4 relative max-sm:col-span-7">
            <h3 className=" mb-2"> ساعات العمل الأسبوعية </h3>

            <label
              className="flex items-center md:p-[10px] bg-transparent md:py-[11px] overflow-clip  border-[2px] border-[#cacfd5] rounded-[7px]  text-gray-700 bg-white  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {dropdownOpen
                ? `${fields.map((day) => day.day.trim()).join(", ")}`
                : fields.length > 0
                ? `${fields.map((day) => day.day.trim()).join(", ")}`
                : ""}

              <h1
                className={` ${
                  dropdownOpen ? `rotate-[180deg]` : `rotate-[270deg]`
                } font-bold font-serif pl-1 text-[20px]`}
              >
                {" "}
                ^{" "}
              </h1>
            </label>
            {
              <div
                className={`absolute z-1 overflow-y-auto max-h-[290px] max-sm:max-h-[250px]  ${
                  !dropdownOpen && "hidden"
                }  bg-white text-xl shadow-lg border border-gray-300`}
              >
                {daysOfWeek.map((day) => (
                  <WeekDayInput
                    key={day}
                    day={day}
                    fields={fields}
                    append={append}
                    remove={remove}
                    control={control}
                  />
                ))}
              </div>
            }

            {errors.weekwork && (
              <>
                <span className="text-red-500 text-[16px]">
                  {errors.weekwork.message ? (
                    "يجب إدخال اوقات الدوام"
                  ) : (
                    <>
                      <div className="grid grid-cols-5">
                        <h1 className="col-span-2 flex">
                          يجب ادخال أوقات بدء الدوام
                        </h1>
                        <h1 className="col-span-2 ">وانتهاءالدوام</h1>
                      </div>
                    </>
                  )}
                </span>
              </>
            )}
          </div>
          <div className="ms:mb-1 row-span-3 col-span-3 max-sm:col-span-4 ">
            <label htmlFor="img" className="block ">
              الصورة
            </label>
            <label
              htmlFor="img-preview"
              className="cursor-pointer items-center bg-black"
            >
              {doctroImageUrl ? (
                <img
                  src={doctroImageUrl}
                  alt="Current"
                  className=" border h-[200px] max-sm:h-[150px] object-cover w-full border-gray-300 row-span-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  />
              ) : (
                <div className="w-full h-[200px] max-sm:h-[150px] border border-gray-300 rounded-md flex items-center justify-center">
                    <span>اختر صورة</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="img-preview"
              className="hidden" // جعل الإدخال غير مرئي
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setdoctroImageUrl(reader.result as string);
                    setValue("img", file as any); // تحديث قيمة الصورة في النموذج
                  };
                  reader.readAsDataURL(file);
                } 
              }}
            />
          </div>

          <div className=" col-span-4 max-sm:col-span-3">
            <label htmlFor="title" className="block font-medium">
              معلومات الدكتور
            </label>
            <Controller
              defaultValue=""
              name="information"
              control={control}
              render={({ field }) => (
                <textarea
                  id="title"
                  className="w-full border border-gray-300 rounded-md h-[200px] max-sm:h-[150px] row-span-5  focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل معلومات عن الدكتور"
                  {...field}
                />
              )}
            />
            {errors.information && (
              <span className="text-red-500 text-[16px]">
                {errors.information.message}
              </span>
            )}
          </div>
          <div className="col-span-7 flex justify-around items-center">
            <Button type="submit" label={"تحديث"} className={`w-[40%] max-sm:w-[30%]  max-sm:h-7`} />
            <Button
              label={"خروج"}
              onClick={() => setUpdating(false)}
              className={`w-[40%] max-sm:w-[30%]  max-sm:h-7 bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
