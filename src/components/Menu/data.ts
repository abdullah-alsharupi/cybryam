import { permission } from "process";

export const menu = [
  {
   
        id: 1,
        title: "الرئيسية",
        url: "/Dashboard",
        icon: "home.svg",
        permissionPage:""
      },
  
 

      {
        id: 2,
        title: "المستخدمين",
        url: "/Dashboard/user",
     
      },
      {
        id: 11,
        title: "الحجوزات",
        url: "/Dashboard/appointments/appointmentsManage",
     
      },
      {
        id: 3,
        title: "الأخبار ",
        url: "/Dashboard/news",
        permissionPage:"News"
      },
      {
        id: 4,
        title: "المدونات",
        url: "/Dashboard/blog",
        permissionPage:"Blog"
      },
      {
        id: 5,
        title: "الدكاترة",
        url: "/Dashboard/doctor",
        permissionPage:"Doctors"
       
      },
      {
        id: 6,
        title: "الأقسام",
        url: "/Dashboard/department",
        permissionPage:"Departments"
       
      },
      {
        id: 7,
        title: "الفروع",
        url: "/Dashboard/hospital",
        permissionPage:"Patients"
       
      },
      {
        id: 8,
        title: "العاملين",
        url: "/Dashboard/",
        
      },
 
  
    
      {
        id: 9,
        title: "التحليلات",
        url: "/Dashboard/statistics",
        icon: "element.svg",
      },
      {
        id: 10,
        title: "الإعدادات",
        url: "/",
        icon: "note.svg",
      },
    
 
  

];

