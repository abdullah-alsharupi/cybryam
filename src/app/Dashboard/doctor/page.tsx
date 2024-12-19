"use client";
import React, { useState } from "react";

import { useGetDoctor } from "@/queries/doctors/getAllDoctors";

import Button from "@/components/ui/button";
import UpdateDoctor from "./doctorUpdate";
import AddDoctor from "./doctorAdd";

import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { doctorDelete } from "@/mutations/doctors/deleteDoctor";
import Card from "../card/page";

import { useCookies } from "react-cookie";

import { useSession } from "next-auth/react";

import { formatArabicTime } from "@/app/util/dateFormat";
import DangerDialog from "@/components/ui/danger-dialog";
import ToastContainer from "@/components/ui/toastCobtainer";
import DynamicTable from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function Doctors() {
  const [open, setOpen] = useState(false);
  const router=useRouter()
  const { isLoading, error, data, refetch } = useGetDoctor();
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpating] = useState(false);
  const [success, setSuccess] = useState("");

  const [add, setAdd] = useState(false);
  const [id, setId] = useState<any>({ id: "", name: "" });
  const [idUpdate, setIdUpate] = useState("");
  const { data: session } = useSession();

  const pageName = "Doctors";
  const permissions = (
    session?.user as { permissions?: any }
  )?.permissions?.find(
    (permission: any) => permission.page === pageName
  )?.actions;

  const Close = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationKey: ["deletDoctor"],
    mutationFn: (id: String) => doctorDelete(id as string),
    onError(err: any) {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
      setOpen(false);
    },
    onSuccess() {
      refetch(), setOpen(false);
      setSuccess("لقد تم الحذف بنجاح");
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id as string);
  };

  if (isLoading) return <p>جاري جلب بيانات ...</p>;
  if (error) return <p>خطأ في جلب بيانات ...</p>;
  const filteredDoctor =data?.filter((doctor: any) =>
    doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
   
    {
      title: "الصورة",
      render: (item: any) =>
        item.img ? (
         <div className="h-[50px] w-[50px] rounded-[50%] ">
           <img
        height={50}
        width={50}
            src={`/images/${item.img}`}
            className="w-full h-full rounded-[50%] object-cover"
            alt="صورة"
          />
         </div>
        ) : (
          "لاتوجد صوره"
        ),
    },
    {
      title: "الأسم",
      render: (item: any) => (
        "د/ "+item.doctorName
      ),
    },
    {
      title: "التخصص ",
      render: (item: any) => (
       item.specialist
      ),
    },

    {
      title: " القسم ",
      render: (item: any) => item.department?.depName || "غير متوفر",
    },
    {
      title: " الهاتف ",
      render: (item: any) => item.phone,
    },
    {
      title: " معلومات  ",
      render: (item: any) => 
        <div className="">{item.information}</div>
      
    },
    {
      title: " الدوام", 
      render: (item: any) =>  <div className="flex justify-center p-3">
        <select name="" id="" className="max-lg:w-20 w-[100px]">
      <option className="text-center max-lg:w-20 w-[100px]">
        {item.weekwork.map((e: any) => `${e.day},`)}
      </option>

      {item.weekwork.map(
        (workItem: any, doctroIdx: number) => (
          <option className="text-center max-lg:w-20 w-[100px]" key={doctroIdx}>
            {workItem.day} يبدأ من{" "}
            {formatArabicTime(workItem.startTime)} وينتهي{" "}
            {formatArabicTime(workItem.endTime)}
          </option>
        )
      )}
    </select>
      </div>
    },
    {
      title: "الإجراءات",
      render: (item: any) => (
        <div className="flex justify-center  gap-2 ml-[10%]">
          <Button
            disabled={!permissions?.includes("تعديل")}
            onClick={() => {
              setIdUpate(item);

              setUpating(true);
            }}
            label={`تعديل`}
            className={`hover:bg-green-700 `}
          ></Button>
 <Button
            disabled={!permissions?.includes("تعديل")}
            onClick={() => {
              setIdUpate(item);

              setUpating(true);
            }}
            label={`تعديل`}
            className={`hover:bg-green-700 `}
          ></Button>

          <Button
            disabled={!permissions?.includes("حذف")}
            onClick={() => {
              setId({ id: item.id, name: item.doctorName });
              setOpen(true);
            }}
            label={`حذف`}
            className={` bg-red-700 `}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {!permissions?.includes("إخفاء الصفحة") && (
        <div
          className="overflow-y-scroll rounded-br-2xl rounded-bl-2xl"
          style={{
            height: `${window.screen.height - window.screen.height / 3.8}px`,
            direction: "ltr",
          }}
        >
          <DangerDialog
            content={`هل تريد الحذف  حقاً`}
            onClose={Close}
            onConfirm={() => handleDelete(id.id)}
            open={open}
            title={`  سيتم حذف ${id.name} `}
          ></DangerDialog>
          <ToastContainer message={success} type={"success"} />
          <div
            className="flex flex-row gap-3 mt-2 sticky top-0 bg-slate-200"
            style={{ direction: "rtl" }}
          >
            <Button
              disabled={!permissions?.includes("إضافة")}
              onClick={() => setAdd(true)}
              className={`mr-3 py-[3px] rounded-[10px]  border border-solid h-9 mt-1`}
            >
              <img src="/plus.png" width={20} height={20} alt="plus" />
            </Button>

            <input
              type="text"
              placeholder="ابحث عن طبيب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 mb-4"
            />
          </div>

         
            {filteredDoctor&&<div className="mt-2 mb-2 min-w-full border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl">
                <DynamicTable columns={columns} data={filteredDoctor} key={id}/>
              </div>}
          {data && add && (
            <AddDoctor refetch={refetch} setAdd={setAdd} isAdd={add} />
          )}
          {updating && (
            <UpdateDoctor
              refetch={refetch}
              doctorData={idUpdate}
              isUpdating={updating}
              setUpdating={setUpating}
            />
          )}
        </div>
      )}
      {permissions?.includes("إخفاء الصفحة") && "غير مخول لدخول هذه الصفحة"}
      {}
    </>
  );
}
