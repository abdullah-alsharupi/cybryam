"use client";

import Button from "@/components/ui/button";
import { userType, userZodSchema } from "@/app/types/types";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/mutations/users/updateUser";
import { useGetUsersbyId } from "@/queries/users/useGetUserbyId";
import { cookies } from "next/headers";
import { textFieldClasses, useColorScheme } from "@mui/material";
import { useCookies } from "react-cookie";
import { useGetPermession } from "@/queries/permession/getpermession";
import { Sevillana } from "next/font/google";
import { permission } from "process";
import { ignore } from "antd/es/theme/useToken";
import { Session } from "inspector/promises";
import { useSession } from "next-auth/react";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { message } from "antd";

interface userProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;

  userdata?: any;
}

export default function UserUpdate({
  isOpen,
  userdata,
  setIsOpen,

  refetch,
}: userProps) {
  const id = userdata.id;
  const { data: session } = useSession();
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "", // إضافة حقل تأكيد كلمة المرور هنا
      roleName: "",
      permissionPageDoctors: "",
      permissionPageNews: "",
      permissionPageDepartments: "",
      permissionPagePatients: "",
      permissionPageBlogs: "",
    },
  });

  const [showPermissions, setShowPermissions] = useState(
    userdata.role == "user"
  ); // حالة لإظهار قائمة الصلاحيات
  const { data: dataPermession } = useGetPermession();
  const adminPermissions: any = dataPermession
    ?.filter((item: { actions: string | string[] }) => {
      return (
        item.actions.includes("إضافة") &&
        item.actions.includes("تعديل") &&
        item.actions.includes("حذف")
      );
    })
    .map((item: any) => item.id);

  useEffect(() => {
    if (userdata) {
      const { userName, email, role } = userdata;
      setValue("roleName", role || "");

      setValue("userName", userName || "");
      setValue("email", email || "");

      userdata.permissions.forEach((item: any) => {
        if (item.page && item.id) {
          //@ts-ignore
          setValue(`permissionPage${item.page}`, item.id);
        }
      });
    }
  }, []);

  const mutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (data: any) => updateUser(data, id as string),
    onError: (err: any) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      setIsOpen(false);
      control._reset();
      refetch();
      message.success("تم تعديل المستخدم بنجاح");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div dir="rtl">
      <Modal open={isOpen}>
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          تحديث مستخدم
        </h2>
        <form
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start max-sm:text-[15px] font-serif sm:font-normal sm:text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 ">
            <label htmlFor="userName" className="block font-medium mb-2">
              الاسم
            </label>
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="userName"
                  {...field}
                  placeholder="   ادخل اسم المستخدم "
                />
              )}
            />
            {errors.userName && (
              <span className="text-red-500 text-[16px]">
                {errors.userName.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              البريد الالكتروني
            </label>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  id="email"
                  placeholder="   ادخل البريد الالكتروني"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <span className="text-red-500 text-[16px] ">
                {errors.email.message}
              </span>
            )}
          </div>
          <div
            hidden={userdata.email !== session?.user?.email}
            className="mb-4 "
          >
            <label htmlFor="password" className="block font-medium mb-2">
              كلمة المرور
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  required={false}
                  type="password"
                  id="password"
                  placeholder="ادخل كلمة المرور"
                  {...field}
                />
              )}
            />
          </div>

          <div
            hidden={userdata.email !== session?.user?.email}
            className="mb-4 "
          >
            <label htmlFor="confirmPassword" className="block font-medium mb-2">
              تأكيد كلمة المرور
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input
                  required={false}
                  type="password"
                  id="confirmPassword"
                  placeholder="تأكيد كلمة المرور"
                  {...field}
                />
              )}
            />
          </div>
          <div
            hidden={userdata.email === session?.user?.email}
            className="mb-4"
          >
            <label htmlFor="roleName" className="block font-medium mb-2">
              الدور
            </label>
            <Controller
              name="roleName"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    setShowPermissions(e.target.value === "user");
                    field.onChange(e); // تحديث حالة الدور
                    if (e.target.value == "admin") {
                      setValue("permissionPageDoctors", adminPermissions[0]);
                      setValue("permissionPageNews", adminPermissions[2]);
                      setValue("permissionPagePatients", adminPermissions[3]);
                      setValue(
                        "permissionPageDepartments",
                        adminPermissions[1]
                      );
                      setValue("permissionPageBlogs", adminPermissions[4]);
                    }
                  }}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                >
                  <option value="">اختر...</option>
                  <option value="admin">ADMIN</option>
                  <option value="user">USER</option>
                </select>
              )}
            />
            {errors.roleName && (
              <span className="text-red-500 text-[16px]">
                {errors.roleName.message}
              </span>
            )}
          </div>
          {showPermissions && (
            <div className="mb-4">
              <label htmlFor="permissions" className="block font-medium mb-2">
                صلاحيات صفحة الدكتور
              </label>
              <Controller
                name="permissionPageDoctors"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                  >
                    {dataPermession?.map(
                      (permDoctor: any, index: number) =>
                        permDoctor.page == "Doctors" && (
                          <option key={index} value={permDoctor.id}>
                            {permDoctor.actions}
                          </option>
                        )
                    )}
                  </select>
                )}
              />
              {errors.permissionPageDoctors && (
                <span className="text-red-500 text-[16px]">
                  {errors.permissionPageDoctors.message}
                </span>
              )}
            </div>
          )}
           {showPermissions && (
            <div className="mb-4">
              <label htmlFor="permissions" className="block font-medium mb-2">
                صلاحيات صفحة المدونات
              </label>
              <Controller
                name="permissionPageBlogs"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                  >
                    {dataPermession?.map(
                      (permBlogs: any, index: React.Key | null | undefined) =>
                        permBlogs.page == "Blogs" && (
                          <option key={index} value={permBlogs.id}>
                            {permBlogs.actions}
                          </option>
                        )
                    )}
                  </select>
                )}
              />
              {errors.permissionPageBlogs && (
                <span className="text-red-500 text-[16px]">
                  {errors.permissionPageBlogs.message}
                </span>
              )}
            </div>
          )}
          {showPermissions && (
            <div className="mb-4">
              <label htmlFor="permissions" className="block font-medium mb-2">
                صلاحيات صفحة الأمراض
              </label>
              <Controller
                name="permissionPagePatients"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                  >
                    {dataPermession?.map(
                      (permPatient: any, index: number) =>
                        permPatient.page == "Patients" && (
                          <option key={index} value={permPatient.id}>
                            {permPatient.actions}
                          </option>
                        )
                    )}
                  </select>
                )}
              />
              {errors.permissionPagePatients && (
                <span className="text-red-500 text-[16px]">
                  {errors.permissionPagePatients.message}
                </span>
              )}
            </div>
          )}
          {showPermissions && (
            <div className="mb-4">
              <label htmlFor="permissions" className="block font-medium mb-2">
                صلاحيات صفحة الأقسام
              </label>
              <Controller
                name="permissionPageDepartments"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                  >
                    {dataPermession?.map(
                      (permDepartment: any, index: number) =>
                        permDepartment.page == "Departments" && (
                          <option key={index} value={permDepartment.id}>
                            {permDepartment.actions}
                          </option>
                        )
                    )}
                  </select>
                )}
              />
              {errors.permissionPageDepartments && (
                <span className="text-red-500 text-[16px]">
                  {errors.permissionPageDepartments.message}
                </span>
              )}
            </div>
          )}
          {showPermissions && (
            <div className="mb-4">
              <label htmlFor="permissions" className="block font-medium mb-2">
                صلاحيات صفحة الأخبار
              </label>
              <Controller
                name="permissionPageNews"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                  >
                    {dataPermession?.map(
                      (permNews: any, index: number) =>
                        permNews.page == "News" && (
                          <option key={index} value={permNews.id}>
                            {permNews.actions}
                          </option>
                        )
                    )}
                  </select>
                )}
              />
              {errors.permissionPageNews && (
                <span className="text-red-500 text-[16px]">
                  {errors.permissionPageNews.message}
                </span>
              )}
            </div>
          )}

          <div className="col-span-2 flex justify-between items-center">
            <Button
              label={"تحديث"}
              type="submit" // تأكد من إضافة هذا
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
}
