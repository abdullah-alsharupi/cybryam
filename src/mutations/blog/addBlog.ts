import { apifetch } from "@/api";
import { News } from "@/app/types/types";
import axios from "axios";

export const AddBlog= async (data: any) => {
  
    const response = await fetch(`/api/blog`,{
      method: 'POST', // أو PUT إذا كنت تريد تحديث بيانات
     
      body: data,
  });

  if (!response.ok) {
    const errorData = await response.json();
  
    throw new Error(errorData.message || 'حدث خطأ غير متوقع.'); // استخدم الرسالة من الخادم إذا كانت موجودة
  }
  
  return response.json();
};
