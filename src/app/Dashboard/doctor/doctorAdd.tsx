import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorZodSchema, doctroType, hospitalType } from "@/app/types/types";
import { doctorAdd } from "@/mutations/doctors/addDoctor";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { message } from "antd";

import WeekDayInput from "./WeekDayInput";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import ToastContainer from "@/components/ui/toastCobtainer";
import { dividerClasses } from "@mui/material";
import { useRouter } from "next/navigation";
import AddDepart from "../department/departmentAdd";
import { useGetHospital } from "@/queries/hospital/useGetHospital";
import toast from "react-hot-toast";

const daysOfWeek = [
  "السبت",
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
];

interface doctorProps {
  isAdd: boolean;
  setAdd: (isOpen: boolean) => void;
  refetch: (
    Options?: RefetchOptions
  ) => Promise<QueryObserverResult<doctroType[] | null, Error>>;
}

export default function AddDoctor({ isAdd, setAdd, refetch }: doctorProps) {
  const router = useRouter();
  const [addDepartment, setAddDeparment] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [doctroImageUrl, setDoctroImageUrl] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<doctroType>({
    defaultValues: {
      doctorName: "",
    },

    resolver: zodResolver(doctorZodSchema),
  });
  const { data: dataDepartment, refetch: refetchDepartment } =
    useGetDepartments();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "weekwork",
  });
  const mutation = useMutation({
    mutationKey: ["add-doctor"],
    mutationFn: (formatDate: FormData) => doctorAdd(formatDate),
    onError: (error) => {
      const errorMessage = error.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      reset();
      setSuccess("تم إضافة الدكتور بنجاح");
      refetch();
      fields.pop();
      setDoctroImageUrl(null);
    },
  });
  const setDataDoctor = () => {
    setValue("doctorName", "");
    setValue("specialist", "");
    setValue("phone", "");
    setValue("department.depName", "");
    setDoctroImageUrl(null);
    setValue("information", "");
    fields.pop();
    setValue("weekwork", []);
  };

  const onSubmit = async (data: doctroType) => {
    const formData = new FormData();
    formData.append("doctorName", data.doctorName);
    formData.append("specialist", data.specialist);
    if (data.img) {
      formData.append("img", data.img);
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
mutation.mutateAsync(formData)
  }

  return (
    <div>
      {(
        <div dir="rtl">
          <Modal
            open={isAdd}
            width={600}
            className="top-[1%] font-serif  w-[700px]"
          >
            {dataDepartment?.length > 0 && (
              <>
                <h2 className="text-2xl font-bold max-sm:text-[18px] sm:mb-4 font-serif text-center">
                  إضافة دكتور جديد
                </h2>
                <form
                  dir="rtl"
                  className="grid sm:grid-cols-7 max-sm:gap-x-2 max-sm:mb-3 gap-2 max-sm:text-[15px] font-serif sm:font-normal sm:text-xl"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="sm:mb-4 sm:col-span-3 max-sm:col-span-4 ">
                    <label
                      htmlFor="doctorName"
                      className="block font-medium mb-2"
                    >
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

                  <div className="sm:mb-4 sm:col-span-2 max-sm:col-span-3">
                    <label
                      htmlFor="specialist"
                      className="block font-medium mb-2"
                    >
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
                          {dataDepartment?.map((depart: any, index: number) => (
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
                        className={`absolute z-1 overflow-y-auto max-h-[290px] max-sm:max-h-[250px] ${
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

                  <div className="mb-1 row-span-3 col-span-3 max-sm:col-span-4 ">
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
                            setDoctroImageUrl(reader.result as string);
                            setValue("img", file as any);
                            // تحديث قيمة الصورة في النموذج
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setValue("img", null); // إذا لم يتم اختيار ملف، قم بتحديث القيمة إلى null
                        }
                      }}
                    />
                  </div>

                  <div className=" col-span-4  max-sm:col-span-3">
                    <label htmlFor="title" className=" block font-medium">
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

                  <div className="col-span-7  flex justify-around  items-center">
                    <Button
                      type="submit"
                      label={"إضافة"}
                      className={`w-[40%] max-sm:w-[30%]  max-sm:h-7 `}
                    />

                    <Button
                      label={"خروج"}
                      onClick={() => setAdd(false)}
                      className={` bg-red-700 w-[40%] max-sm:w-[30%]  max-sm:h-7 `}
                    />
                  </div>
                </form>
              </>
            )}
            {dataDepartment?.length == 0 && (
              <div>
                <h1 className="text-red-700 text-center  font-bold text-[20px]">
                  {" "}
                  يرجى إضافة القسم أولا للإضافة انقر على زر الأضافة
                </h1>
                <div className="flex justify-between mt-4">
                  <Button
                    type="submit"
                    onClick={() => {
                      setAddDeparment(true);
                    }}
                    label={"  إضافة قسم "}
                    className={`w-[40%]  max-sm:w-[30%]  max-sm:h-7  `}
                  />
                  <Button
                    label={"خروج"}
                    onClick={() => setAdd(false)}
                    className={` bg-red-700 w-[40%] max-sm:w-[30%]  max-sm:h-7 `}
                  />
                </div>
              </div>
            )}
          </Modal>
          <ToastContainer message={success} type={"success"} />
        </div>
      )}
      {addDepartment && (
        <AddDepart
          refetch={refetchDepartment}
          setAdd={setAddDeparment}
          isAdd={addDepartment}
        />
      )}
    </div>
  );
}
