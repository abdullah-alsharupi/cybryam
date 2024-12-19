import { apifetch } from "@/api";
import { User } from "@/app/types/types";
import axios, { AxiosError } from "axios";

export const addUser=async(data:any,token:string)=>{

    const response = await fetch(`/api/user`,{
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
}