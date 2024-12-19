'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const HeaderClient: React.FC = () => {
  const router=useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [colorNavBar,setColorNavBar]=useState('home')
  return (
   <div className="font-serif">
   
   {showMenu && (
        <div className=" pl-4 flex flex-col top-0 lg:hidden fixed z-[999] left-0 items-start justify-start text-black gap-2 w-[100%] bg-white py-3 ">
          <div
            className="flex flex-row gap-2  "
          
          >
            <button className="h-[30px] w-[30px]"  onClick={() => {
              setShowMenu((showMenu) => !showMenu);
            }}>
               <img src="/icons/menu.svg" alt="" className="h-[30px] w-[30px]" />
            </button>
           
            <button onClick={()=>{setShowMenu(false); router.push('/main')}}>  HOME{" "}</button>
           
          </div>
          <button className="border-white border-solid border-[4px]" onClick={()=>router.push(`/main/department`)}>SPECIALIST</button>
          <button onClick={()=>{setShowMenu(false); router.push('/main/doctor')}}>DOCTORS</button>
         
          <button>FACILITES </button> <button>INTERNATIONAL PATIENTS </button>
          <button onClick={()=>{setShowMenu(false); router.push("/main/blogSection")}}>BLOG</button>
          <button className="h-7 w-7 flex   text-center ">
            <img src="/icons/search.svg" alt="" className="p-1" />
          </button>{" "}
          <button className="flex flex-row-reverse gap-5 items-center">
            {" "}
            <h1>22-34-5677</h1>{" "}
            <img src="/icons/phone.svg" alt="" className="" />{" "}
          </button>{" "}
          <button  onClick={()=>{setShowMenu(false);router.push('/main/detailsOfBooking')}} className=" h-8  gap-4  flex flex-row text-center items-center rounded-3xl align-middle py-[1px] ">
            <img src="/icons/books.svg" alt="" /> <h1> My an Appointment</h1>
          </button>
        </div>
      )}
 <div className="h-[50px] bg-white flex flex-row justify-between max-md:justify-between max-sm:px-[1%] sm:px-[8%] items-center py-[1.5%]">
          <div
            className="md:hidden left-2 h-[10%] flex items-center justify-center "
            onClick={() => {
              setShowMenu((showMenu) => !showMenu);
            }}
          >
            <button>
              <img src="/icons/menu.svg" alt="" className="h-[30px] w-[30px]" />
            </button>
          </div>
          <div
            className="flex flex-row-reverse  
           gap-4 items-center "
          >
            {" "}
            <h1 className="text-[20px]">ALMAJD HOSPITAL</h1>
            <div className="relative items-center">
              <img src="/icons/helal.svg" className=" " />
              <img
                src="/icons/middle.svg"
                alt=""
                className="absolute z-0 items-center top-0 left-2 right-0"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center  max-md:hidden  gap-5">
            {" "}
            <button className="rounded-[50%] max-lg:hidden h-7 w-7 flex  border-[#232f66] border-solid border-[2px] text-center ">
              <img src="/icons/search.svg" alt="" className="p-1" />
            </button>{" "}
            <button className="flex flex-row-reverse gap-5 items-center  max-lg:hidden px-5">
              {" "}
              <h1>22-34-5677</h1>{" "}
              <img src="/icons/phone.svg" alt="" className="" />{" "}
            </button>{" "}
            <button  onClick={()=>{
                setColorNavBar('booking')
              router.push('/main/detailsOfBooking')}} className="border-[#232f66] border-solid border-[2px] h-8 px-5 gap-4  flex flex-row text-center items-center rounded-3xl align-middle py-[1px] ">
              <img src="/icons/books.svg" alt="" />{" "}
              <h1 className={`${colorNavBar=='booking'&& 'text-[#dea94d]'}`}> My an Appointment</h1>
            </button>
          </div>
        </div>
        <div className="bg-[#232f66] py-[20px] max-md:py-[10px] max-sm:text-[12px]  ">
        <div className=" flex flex-row  justify-around justify-items-center text-white   left-[5%] right-[5%]">
        <button className={`${colorNavBar=='home'&& 'text-[#dea94d] border-gray-50 border-solid border-[2px] px-[1px] py-[1.5px] rounded'}`} onClick={()=>{
          setColorNavBar('home')
          router.push('/main')}}>  HOME{" "}</button>
          <button className={`${colorNavBar=='department'&& 'text-[#dea94d] border-inherit shadow-inner border-solid border-[2px] px-[1px] py-[2px] rounded'}`} onClick={()=>{
            setColorNavBar('department')
            router.push(`/main/department`)}}>DEPARTMENT</button>
          <button className={`${colorNavBar=='doctor'&& 'text-[#dea94d] border-gray-50 border-solid border-[2px] px-[1px] py-[2px] rounded'}`} onClick={()=>{
            setColorNavBar('doctor')
            router.push('/main/doctor')}}>DOCTORS</button>
          
          <button>FACILITES </button> 
          <button className={`${colorNavBar=='blog'&& 'text-[#dea94d] border-gray-50 border-solid border-[2px] px-[1px] py-[2px] rounded'}`} onClick={()=>{setColorNavBar('blog'),
             router.push("/main/blogSection")}}>BLOG</button>
        </div>
      </div>
   </div>
  );
};
