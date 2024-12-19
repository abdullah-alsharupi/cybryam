"use client";
import DynamicTable from "@/components/ui/table";
import React, { useState } from "react";
import AddDepart from "../department/departmentAdd";
import UpdateDeprt from "../department/departmentUpdate";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import { Permission } from "@/app/types/types";
import { useGetHospital } from "@/queries/hospital/useGetHospital";
import HospialAdd from "./hospitalAdd";
import HospialUpdate from "./hospitalUpdate";
import { useMutation } from "@tanstack/react-query";
import { DeletHospital } from "@/mutations/hospital/deleteHospital";
import DangerDialog from "@/components/ui/danger-dialog";

function Hospial() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { isPending, data: dataOfHospital, refetch } = useGetHospital();
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpating] = useState(false);

  const [success, setSuccess] = useState("");
  const [add, setAdd] = useState(false);
  const [deleteHospital, setDeleteHospital] = useState<any>({
    id: "",
    name: "",
  });
  const [idUpdate, setIdUpate] = useState("");
  const [cookies] = useCookies(["authToken"]);
  const { data: session } = useSession();

  const Close = () => {
    setOpen(false);
  };
  const pageName = "Doctors";
  const permissions = (
    session?.user as { permissions?: Permission[] }
  )?.permissions?.find((permission) => permission.page === pageName)?.actions;

  const mutation = useMutation({
    mutationKey: ["delet-hospital"],
    mutationFn: (id: String) => DeletHospital(id as string),
    onError(err: any) {
      const errorMessage = err.message || "حدث خطأ غير متوقع";

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
      title: "الاسم",
      render: (item: any) => item?.name || "غير متوفر",
    },
    {
      title: "الوصف",
      render: (item: any) => (
        <div className="hover:absolute hover:bg-gray-300 hover:rounded-xl hover:p-2 hover:max-w-[20%]">
          {item?.description || "غير متوفر"}
        </div>
      ),
    },
    {
      title: "الهدف",
      render: (item: any) => (
        <div className="hover:absolute hover:bg-gray-300 hover:rounded-xl hover:p-2 hover:max-w-[20%]">
          {item?.goal || "غير متوفر"}
        </div>
      ),
    },
    {
      title: "الرسالة",
      render: (item: any) => (
        <div className="hover:absolute hover:bg-gray-300 hover:rounded-xl hover:p-2 hover:max-w-[20%]">
          {item?.message || "غير متوفر"}
        </div>
      ),
    },
    {
      title: "الرؤية",
      render: (item: any) => (
        <div className="hover:absolute hover:bg-gray-300 hover:rounded-xl hover:p-2 hover:max-w-[20%]">
          {item?.vision || "غير متوفر"}
        </div>
      ),
    },
    {
      title: "الإيميل",
      render: (item: any) => (
        <div className="hover:absolute hover:bg-gray-300 hover:rounded-xl hover:p-2  hover:max-w-[20%]">
          {item?.email || "غير متوفر"}
        </div>
      ),
    },

    {
      title: "الهاتف",
      render: (item: any) => item?.phone || "غير متوفر",
    },

    {
      title: "رقم الثابت",
      render: (item: any) => item?.telephone || "غير متوفر",
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
              setDeleteHospital({ id: item.id, name: item.name });
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
          <div
            className="flex flex-row gap-3 mt-2 sticky top-0  bg-slate-200"
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
            {dataOfHospital && (
              <div className="mt-2 mb-2 min-w-full border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl">
                <DynamicTable
                  columns={columns}
                  data={dataOfHospital}
                  key={deleteHospital}
                />
              </div>
            )}
          </div>
          {dataOfHospital && add && (
            <HospialAdd refetch={refetch} setAdd={setAdd} isAdd={add} />
          )}
          {updating && (
            <HospialUpdate
              refetch={refetch}
              hospitalData={idUpdate}
              isUpdating={updating}
              setUpdating={setUpating}
            />
          )}
        </div>
      )}
      <DangerDialog
        content={`هل تريد الحذف  حقاً`}
        onClose={Close}
        onConfirm={() => handleDelete(deleteHospital.id)}
        open={open}
        title={`  سيتم حذف ${deleteHospital.name} `}
      ></DangerDialog>
      {permissions?.includes("إخفاء الصفحة") && "غير مخول لدخول هذه الصفحة"}
    </>
  );
}

export default Hospial;
