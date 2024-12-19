import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import axios from "axios";
export const doctroUpdate=async(data:any,id:string )=>{
    const response=await fetch(`/api/Doctor?id=${id}`,{method:"PUT",body:data})
        if (!response.ok) {
            const errorData = await response.json();
          
            throw new Error(errorData.message || 'حدث خطأ غير متوقع.'); // استخدم الرسالة من الخادم إذا كانت موجودة
          }
          
          return response.json();


}