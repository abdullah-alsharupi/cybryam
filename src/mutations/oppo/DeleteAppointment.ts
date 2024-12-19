import { apifetch } from "@/api";
import axios from "axios";

export const DeleteAppointment=async(data: FormData)=>{
    try {
        const response=await apifetch.put(`/patient/id`,data)
  
    return response.data
    } catch (error) {
        if(error&&axios.isAxiosError(error)){
            throw new Error(error.response?.data.message)
        }
      
        throw error
    }
}