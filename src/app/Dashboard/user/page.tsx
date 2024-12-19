"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useGetUsers } from "@/queries/users/useGetUsers";

import AddUser from "./addUser";
import UserUpdate from "./updateUser";

import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import { deleteUser } from "@/mutations/users/deleteUser";
import DangerDialog from "@/components/ui/danger-dialog";
import Button from "@/components/ui/button";
import ToastContainer from "@/components/ui/toastCobtainer";
import { itCH } from "date-fns/locale";
import DynamicTable from "@/components/ui/table";
import { userType } from "@/app/types/validate/validate";

export default function UserTable() {
  const [cookies] = useCookies(["authToken"]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteUserId, setdeleteUserId] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: user, isLoading, error, refetch } = useGetUsers();
  const [filterUsers, setFilterUsers] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();

  const role = (session?.user as { role?: string })?.role;

  const mutation = useMutation({
    mutationKey: ["delete-user"],

    mutationFn: (id: string) => deleteUser(id, cookies.authToken),
    onSuccess() {
      setSuccess("delete successfully");
      refetch();
    },
    onError(error: any) {
      setError(error);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
    setOpenDialog(false);
  };
  const Close = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    if (user) {
      setFilterUsers(user?.map((user: any) => ({ ...user })));
    }
  }, [user]);

  const filteredUsers = filterUsers.filter((user) =>
    user.userName?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  if (isLoading) return <p>جاري جلب بيانات المستخدمين...</p>;
  if (error) return <p>خطأ في جلب بيانات المستخدمين...</p>;
  const columns = [
   

    {
      title: "اسم المستخدم",
      render: (item: any) => (
        <div className=" text-wrap">{item.userName}</div>
      ),
    },
    {
      title: "البريد الإلكتروني ",
      render: (item: any) => (
        <div className=" text-wrap">{item.email}</div>
      ),
    },

    {
      title: " الدور ",
      render: (item: any) => item?.role || "غير متوفر",
    },
    {
      title: " الصلاحيات ",
      render: (item: any) =>   <select name="" className="font-bold" id="">
      {item?.permissions.map(
        (permission: any, index: number) => (
          <option
            className="text-center  text-green-700"
            key={index}
          >
            {permission.page == `Doctors` &&
              `صفحة الدكاترة:${permission.actions}`}
            {permission.page == `News` &&
              `صفحة الأخبار:${permission.actions}`}
            {permission.page == `Patients` &&
              `صفحة المرضى:${permission.actions}`}
            {permission.page == `Departments` &&
              `صفحة الأقسام:${permission.actions}`}
              {permission.page == `Blogs` &&
              `صفحة المدونات:${permission.actions}`}
          </option>
        )
      )}
    </select>,
    },

    {
      title: "الإجراءات",
      render: (item: any) => (
        <div className="flex justify-center  gap-2 ml-[10%]">
          <Button
            onClick={() => {
              setUserData(item);
              setIsModalOpenUpdate(true);
            }}
          >
            تعديل
          </Button>

          <Button
        //@ts-ignore
            disabled={item?.id == session?.user?.id}
            className=" bg-red-700"
            onClick={() => {
              setdeleteUserId(item?.id as string);
              setOpenDialog(true); 
            }}
          >
            حذف
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      {role !== "user" && (
        <div
          className="overflow-y-scroll font-serif  rounded-br-2xl rounded-bl-2xl"
          style={{
            height: `${window.screen.height - window.screen.height / 4}px`,
            direction: "ltr",
            scrollbarWidth: "none",
          }}
        >
          <DangerDialog
            content="هل تريد حذف المستخدم حقاً؟"
            onClose={Close}
            onConfirm={() => handleDelete(deleteUserId)}
            open={openDialog}
            title="حذف مستخدم"
          />
          <div
            className="flex flex-row gap-3 mt-2  top-0 z-[3] bg-slate-200"
            style={{ direction: "rtl" }}
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              className={`mr-3 py-[3px] rounded-[10px] border border-solid h-9 mt-1`}
            >
              <img src="/plus.png" width={20} height={20} alt="plus" />
            </Button>
            <AddUser
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              refetch={refetch}
            />
            {isModalOpenUpdate && (
              <UserUpdate
                userdata={userData}
                isOpen={isModalOpenUpdate}
                refetch={refetch}
                setIsOpen={setIsModalOpenUpdate}
              />
            )}
            <input
              type="text"
              placeholder="بحث عن المستخدمين..."
              className="mb-4 p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredUsers&&<div
            className="mt-2 mb-2 min-w-full  border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl  "
            style={{ direction: "rtl" }}
          >
            <DynamicTable columns={columns} data={filteredUsers} key={deleteUserId}/>
          </div>}

          <ToastContainer message={Error} type={"error"} />
          <ToastContainer message={success} type={"success"} />
        </div>
      )}

      {role === "user" && "غير مخول لدخول هذه الصفحة"}
    </>
  );
}
