"use client";
import React, { useEffect, useState } from "react";

interface Props {
  data: any[];
  columns: any[];
}

const DynamicTable = ({ columns, data }: Props) => {
  const [width, setWidth] = useState<number | undefined>();
  useEffect(() => {
    const getwidth = window.screen.width

    if (getwidth &&getwidth>680) {
      setWidth(Math.ceil((getwidth - getwidth / 4) / columns.length+2));
    }
  }, []);

  return (
     (
      <table
        className="divide-y w-[100%]  font-serif overflow-x-auto  rounded-tl-[20px] rounded-tr-[20px] bg-[#222F66]"
        dir="rtl"
      >
        <thead className="max-sm:hidden  sticky ">
          <tr className="w-[10%] ">
            {columns.map((column, index) => (
              <th key={index} className=" py-5  gap-2 text-center text-white">
                <div style={{maxWidth:`${width!==undefined?column.title=="الإجراءات"?`${width*3}px`:`${width}px`:""}`}}>{column.title}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y-[3px] ">
          {data.map((item, index) => (
            <tr key={index} className="  max-sm:grid max-sm:grid-flow-row">
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={`py-2 text-center  bg-white text-balance max-sm:grid items-center  max-sm:grid-flow-col max-sm:justify-around  max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold  ">{column.title}</h1>{" "}
                  <div 
                    className={`text-center flex justify-center sm:max-h-12 max-sm:max-w-[200px]   sm:overflow-hidden `}
                  style={{maxWidth:`${width!==undefined?column.title=="الإجراءات"?`${width*3}px`:`${width}px`:""}`}}
                  >
                    {column.render ? column.render(item) : item[column]} 
                  </div>
                </td>
              ))}
              <td
                className={`  text-center bg-red-500 max-h-[2px] overflow-hidden  sm:hidden text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
              ></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

export default DynamicTable;
