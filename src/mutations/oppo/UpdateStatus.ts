import { apifetch } from "@/api";

 export const UpdateStatusFuntion= async (data: FormData) => {
    try {
      const response = await apifetch.put(`/patient/updateStatus`, data);
  
      if (response.status !== 200) {
        throw new Error("Error adding oppointment: " + response.data.message);
      }
  
    } catch (error: any) {
      
         throw error
     }
  };
  
