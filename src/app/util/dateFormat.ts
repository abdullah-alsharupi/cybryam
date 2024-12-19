import { format } from "date-fns";
import { ar } from "date-fns/locale";

export const formatDate = (dateToFormat?: Date): string => {
  if (!dateToFormat) return "N/A";

  const date = new Date(dateToFormat);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${month}/${day}/${year}`;
};
export const formatArabicDate = (date: Date | null) => {
  if (!date) {
    return ''; 
  }
  
  return format(date, 'eeee,d MMMM', { locale: ar });
};
export const convertTo12HourFormat = (time:any) => {
  const [hours, minutes] = time.split(":").map(Number);
  const isPM = hours >= 12;
  const adjustedHours = hours % 12 || 12; // تحويل 0 إلى 12
  return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
};
export const formatShortDateTime = (date: any) => {
  const [day,monthY,]=format(date, 'eeee, d MMMM yyyy',).split(',')
  const year=monthY.slice(monthY.length-4,monthY.length)
  return `${day.slice(0,3)},${monthY.slice(0,7)},${year}` ;
};
export const formatArabicDateTime = (date: any) => {

  return format(date, 'eeee, d MMMM yyyy HH:mm a',{locale:ar})
  
};
export const formatDateDay = (date: any) => {

  return format(date, 'eeee, d MMMM yyyy')
  
};
export const formatArabicTime=(time:any)=> {
 
  const [hours, minutes] = time.split(':').map(Number);

 
  const period = hours >= 12 ? 'مساءً' : 'صباحًا';


  const formattedHours = hours % 12 || 12; 

  
  return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
}

export const formatDateTime = (date?: Date): string => {
  if (!date) return "N/A";

  // Parse the date string from the database
  const parsedDate = new Date(date);

  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear().toString();

  let hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
  const seconds = parsedDate.getSeconds().toString().padStart(2, "0"); // Add seconds
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const time = `${hours}:${minutes}:${seconds} ${ampm}`; // Include seconds in the time
  return `${year}-${month}-${day} ${time}`; // Format as YYYY-MM-DD HH:mm:ss AM/PM
};


export const formatTime = (date?: Date): string => {
  if (!date) return "N/A";

  // Parse the date string from the database
  const parsedDate = new Date(date);


  let hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
  const seconds = parsedDate.getSeconds().toString().padStart(2, "0"); // Add seconds
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const time = `${hours}:${minutes}:${seconds} ${ampm}`; // Include seconds in the time
  return `${time}`; // Format as YYYY-MM-DD HH:mm:ss AM/PM
};
export function formatDateRange(from: Date, to: Date): string {
  return `${format(from, "MMM d, yyyy")} - ${format(to, "MMM d, yyyy")}`;
}

