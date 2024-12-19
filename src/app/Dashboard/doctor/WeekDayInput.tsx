"use client"
import { Controller } from 'react-hook-form';
import React from 'react';

interface WorkingHour {
  startTime: string;
  endTime: string;
 
}

interface WeekWork {
  day: string;
  
  workinghour: WorkingHour[];
}

interface WeekDayInputProps {
  day: string;
  fields: WeekWork[];
  append: (value: WeekWork) => void;
  remove: (index: number) => void;
  control: any; // يجب تعديل هذا النوع حسب الهيكل الخاص بك
}

const WeekDayInput: React.FC<WeekDayInputProps> = ({
  day,
  fields,
  append,
  remove,
  control,
}) => {

  const index = fields.findIndex((work) => work.day === day);

  const handleAddWorkingHour = () => {
    if (index > -1) {
      const updatedWork = { ...fields[index] };
      updatedWork.workinghour.push({ startTime: "", endTime: "" });
      remove(index);
      append(updatedWork);
    }
  };

  const handleRemoveWorkingHour = (slotIndex: number) => {
    if (index > -1) {
      const updatedWork = { ...fields[index] };
      updatedWork.workinghour.splice(slotIndex, 1);
      remove(index);
      append(updatedWork);
    }
  };

  return (
    <div>
      <div  className={` relative flex max-sm:flex-col m-1 text-[15px] items-center border-solid rounded border-[1px] border-gray-500 ms:w-[352px] max-sm:min-w-[200px] hover:bg-gray-100`}>
      
     <div className='flex item-center gap-1'>
     <input
        type="checkbox"
        className="mr-2"
        checked={index > -1}
        onChange={(e) => {
          if (e.target.checked) {
            append({ day, workinghour: [{ startTime: "", endTime: "" }] });
          }
           else if (index > -1) {
            remove(index);
          }
        }}
      />
      
      <label>{day}</label>
     </div>
      
      {index > -1 && (
        <div className='flex items-center flex-col pr-1'>
          
          {fields[index].workinghour.map((slot, slotIndex) => (
            <div key={slotIndex} className="flex items-center">
              <h1 className='text-red-700'>من</h1>
              <Controller
                name={`weekwork.${index}.workinghour.${slotIndex}.startTime`}
                control={control}
                render={({ field }) => (
                  <input
                    type="time"
                    className="ml-2 h-[20px] w-[100px] text-black"
                    {...field}
                  />
                )}
              />
              <h1 className='text-red-700'>إلى</h1>
              
              <Controller
                name={`weekwork.${index}.workinghour.${slotIndex}.endTime`}
                control={control}
                render={({ field }) => (
                  <input
                    type="time"
                    className="ml-2 h-[20px] w-[100px] text-black"
                    {...field}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => handleRemoveWorkingHour(slotIndex)}
                className=" text-white p-1 w-[30px] h-[30px] rounded"
              >
              <img src="/icons/delete.svg" alt="" />
              </button>
          
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddWorkingHour}
            className=" bg-blue-500 text-white absolute max-sm:top-1   w-[18px] h-[18px] left-1 bottom-[calc(50%-8px)]  rounded"
          >
            <img src="/plus.png" width={20} height={20} alt="plus" />
          </button>
        </div>
      )}
      
    </div>
  
    </div>
  );
};

export default WeekDayInput;
