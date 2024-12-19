import { apifetch } from "@/api";
import { Doctor, doctroType } from "@/app/types/types";
import { message } from "antd";
import axios from "axios";

export const doctorAdd = async (data: any) => {
  
    // Validate data (consider using a validation library)
    // if (!isValidDoctorData(data)) { // Replace `isValidDoctorData` with your validation logic
    //   throw new Error("Invalid doctor data");
    // }

    // const response = await apifetch.post(`addDoctor`, data,{headers:{Authorization:`Bearer ${token}`}});

    const response = await fetch(`/api/Doctor`,{
      method: 'POST', // أو PUT إذا كنت تريد تحديث بيانات
     
      body: data,
  });
  const errorData = await response.json();
  const message=errorData.message
  if (!response.ok) {
  
   
    
    
    return {errorData,message,status:response.ok}
   
  // استخدم الرسالة من الخادم إذا كانت موجودة
  }
  
  return {status:response.status,message};
  }
