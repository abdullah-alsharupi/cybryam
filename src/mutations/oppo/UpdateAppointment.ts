import { apifetch } from "@/api";

 export const UpdateAppointment= async (data: any) => {
console.log(data)
    try {
      const response = await apifetch.put(`/patient`, data);
  
      if (response.status !== 200) {
        throw new Error("Error update oppointment: " + response.data.message);
      }
  
    } catch (error: any) {
      
         throw error
     }
  };
  
