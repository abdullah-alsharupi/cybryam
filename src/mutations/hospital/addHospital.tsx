import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import db from "@/db/db";
import axios from "axios";
import { json } from "stream/consumers";

export const AddHospital = async (data: any) => {
  const response = await fetch(`/api/hospital`, {
    method: "POST", // أو PUT إذا كنت تريد تحديث بيانات

    body: data,
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "حدث خطأ غير متوقع."); // استخدم الرسالة من الخادم إذا كانت موجودة
  }

  return response.json();
};
