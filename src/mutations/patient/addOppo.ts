import { apifetch } from "@/api";
import { News } from "@/app/types/types";
import axios from "axios";
import { cookies } from "next/headers";
import { stringify } from "querystring";
import { json } from "stream/consumers";

export const addOppo= async (data: any) => {
  
    
    const response = await fetch(`/api/oppointment`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // تأكد من أنك ترسل البيانات بتنسيق JSON
      },
      body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
  
    throw new Error(errorData.message || 'حدث خطأ غير متوقع.'); // استخدم الرسالة من الخادم إذا كانت موجودة
  }
  
  return response.json();
};
