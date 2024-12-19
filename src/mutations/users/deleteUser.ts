import { apifetch } from "@/api";
import axios from "axios";

export const deleteUser=async(id: string,token?:string)=>{

    const response = await fetch(`/api/user`,{
        method: 'PUT', // أو PUT إذا كنت تريد تحديث بيانات
       
        body: JSON.stringify({id:`${id}`}),
    });
    if (!response.ok) {
        const errorData = await response.json();
      
        throw new Error(errorData.message || 'حدث خطأ غير متوقع.'); // استخدم الرسالة من الخادم إذا كانت موجودة
      }
      
      return response.json();
}