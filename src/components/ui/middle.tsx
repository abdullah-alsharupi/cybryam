'use client'
import React from 'react'

const Middle=()=>{
return (

    <>
     <div className="flex justify-center items-center mt-[3%] absolute inset-x-11 z-[999]">
        <div className="w-0 h-0 border-t-[50px] border-r-[50px] border-l-[50px] border-solid border-x-transparent border-t-white"></div>
      </div>
      <div className="bg-[#eeee] h-full mt-[3%]">
        <div className="flex flex-row-reverse max-md:flex-col max-md:p-0  justify-around ">
          <div className="relative w-[50%] max-md:w-full">
            <div className="rounded-tl-[30%] rounded-br-[30%]  w-[50%] bg-[#967a13ee] opacity-55 h-[40%] absolute bottom-0 left-0 inset-x-0"></div>
            <img src="/images/4.svg" alt="" className="w-[100%] h-full max-md:bottom-0 max-md:top-0" />
          </div>

          <div className="w-[50%] max-md:w-full ">
         <div className="py-[2%]"> <h1 className="text-[36px] font-[400px] font-serif text-center">  Welcome to 
        </h1><h1 className="text-[36px] font-[400px] text-[#D8B36A] font-serif h-full text-center"> Almajed Hospital</h1></div>
            <div className="h-full px-[3%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacus,
              mauris sagittis et sem. Magna cursus orci id. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Ut lacus, mauris sagittis
              et sem. Magna cursus orci id. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Ut lacus, mauris sagittis et sem.
              Magna cursus orci id. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Ut lacus, mauris sagittis et sem. Magna cursus
              orci id. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ut lacus, mauris sagittis et sem. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </div>
          </div>
        </div>
      </div></>
)
}

export default Middle