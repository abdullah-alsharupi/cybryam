import React from 'react'
interface Textprops{
  text:string;
}
export default function SplietText({text}:Textprops) {
    
  return (
    <div>
 {text.length>1&& text
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part.length > 0).map((text:string, index:number) => (
                <div
                  key={index}
                  className="flex  align-top items-center gap-3 flex-row"
                >
                  <h1 className="bg-black h-2 w-2 rounded-full"></h1>
                  <h1 className='w-[calc(100%-8px)]'>{text}</h1>
                </div>
              ))}
    </div>
  )
}
