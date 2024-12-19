"use client";
import React, {  useState } from "react";

import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import Card from "../card/page";
import AddDepart from "./departmentAdd";
import UpdateDeprt from "./departmentUpdate";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { departmentDelete } from "@/mutations/department/deleteDepart";
import { useCookies } from "react-cookie";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DangerDialog from "@/components/ui/danger-dialog";
import ToastContainer from "@/components/ui/toastCobtainer";
import Button from "@/components/ui/button";
import DynamicTable from "@/components/ui/table";

interface Permission {
  page: string;
  id: string;
  actions: string;
}

export default function Department() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isPending, data, refetch } = useGetDepartments();
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpating] = useState(false);

  const [success, setSuccess] = useState("");
  const [add, setAdd] = useState(false);
  const [deleteDepartment, setDeleteDepartment] = useState<any>({
    id: "",
    name: "",
  });
  const [idUpdate, setIdUpate] = useState("");
  const [cookies] = useCookies(["authToken"]);
  const { data: session } = useSession();

  const Close = () => {
    setOpen(false);
  };
  const pageName = "Departments";
  const permissions = (
    session?.user as { permissions?: Permission[] }
  )?.permissions?.find((permission) => permission.page === pageName)?.actions;

  const mutation = useMutation({
    mutationKey: ["deletDepartment"],
    mutationFn: (id: String) =>
      departmentDelete(id as string, cookies.authToken),

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

  const filteredDepartment = data?.filter((department: any) =>
    department.depName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
   
    {
      title: "الصورة",
      render: (item: any) =>
        item.img ? (
         <div className="h-[50px] w-[50px]  ">
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
      title: " اسم القسم",
      render: (item: any) => item?.depName || "غير متوفر",
    },
    {
      title: " معلومات القسم",
      render: (item: any) => item?.description || "غير متوفر",
    },
    {
      title: "أسماء الدكاترة",
      render: (item: any) => (
        <select name="" id="">
          {item?.doctors.map((doctor: any, doctroIdx: number) => (
            <option className="text-center" key={doctroIdx}>
              {doctor.doctorName}
            </option>
          ))}
        </select>
      ),
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
            disabled={!permissions?.includes("حذف")}
            onClick={() => {
              setDeleteDepartment({ id: item?.id, name: item?.depName });
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
          style={{
            height: `${window.screen.height - window.screen.height / 4}px`,
            direction: "ltr",
          }}
        >
          <DangerDialog
            content={`هل تريد الحذف  حقاً`}
            onClose={Close}
            onConfirm={() => handleDelete(deleteDepartment.id)}
            open={open}
            title={`  سيتم حذف ${deleteDepartment.name} `}
          ></DangerDialog>
          <ToastContainer message={success} type={"success"} />
          <div
            className="flex flex-row gap-3 mt-2 sticky top-0   bg-slate-200"
            style={{ direction: "rtl" }}
          >
            <Button
              disabled={!permissions?.includes("إضافة")}
              onClick={() => setAdd(true)}
              className={`mr-3 py-[3px] rounded-[10px] border border-solid h-9 mt-1 `}
            >
              <img src="/plus.png" width={20} height={20} alt="plus" />
            </Button>

            <input
              type="text"
              placeholder="ابحث عن القسم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 mb-4"
            />
          </div>
          <div
            className="overflow-x-auto "
            style={{
              height: `${window.innerHeight - window.innerHeight / 5}px`,
              direction: "ltr",
            }}
          >
            {filteredDepartment && (
              <div className="mt-2 mb-2 min-w-full border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl">
                <DynamicTable
                  columns={columns}
                  data={filteredDepartment}
                  key={deleteDepartment}
                />
              </div>
            )}
          </div>
          {data && add && (
            <AddDepart refetch={refetch} setAdd={setAdd} isAdd={add} />
          )}
          {updating && (
            <UpdateDeprt
              refetch={refetch}
              dataOfDepartment={idUpdate}
              isUpdating={updating}
              setUpdating={setUpating}
            />
          )}
        </div>
      )}
      {permissions?.includes("إخفاء الصفحة") && "غير مخول لدخول هذه الصفحة"}
    </>
  );
}
