import { apifetch } from "@/api";
import axios from "axios";
import { headers } from "next/headers";
export const departmentDelete = async (id: string, token?: string) => {
  //const response=await apifetch.put(`/deleteDepartment/${id}`,"",{headers:{Authorization:`Bearer ${token}`}})

  const response = await fetch(`/api/Department/id`, {
    method: "PUT", // أو PUT إذا كنت تريد تحديث بيانات

    body: JSON.stringify({ id: `${id}` }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "حدث خطأ غير متوقع."); // استخدم الرسالة من الخادم إذا كانت موجودة
  }

  return response.json();
};
