"use client"

import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import axios from "axios";
import { headers } from "next/headers";

export const doctorDelete=async(id:string)=>{

    const response = await fetch(`/api/Doctor/id`,{
        method: 'PUT', // أو PUT إذا كنت تريد تحديث بيانات
       
        body: JSON.stringify({id:`${id}`}),
    });
    if (!response.ok) {
        const errorData = await response.json();
      
        throw new Error(errorData.message || 'حدث خطأ غير متوقع.'); // استخدم الرسالة من الخادم إذا كانت موجودة
      }
      
      return response.json();
}