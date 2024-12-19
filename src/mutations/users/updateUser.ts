import { apifetch } from "@/api";
import { UpdateUser, User } from "@/app/types/types";
import axios from "axios";
export const updateUser=async(data:any,id:string)=>{

    const response = await fetch(`/api/user/id?id=${id}`, {
      method: "PUT",
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