'use client'
import React,{createContext, useRef,useContext} from "react";
interface ScrollContextType{
  targetRef:React.RefObject<HTMLDivElement>;
  ScrollToTarget:()=>void

}
const ScrollContext = createContext<ScrollContextType |null>(null);
export const ScrollProvider=({ children }: { children: React.ReactNode })=>{
  const targetRef = useRef<HTMLDivElement>(null);
  const ScrollToTarget=()=>{
   if(targetRef.current){

     targetRef.current?.scrollIntoView({ behavior: 'smooth' });
   }
 }
 return (<ScrollContext.Provider value={{targetRef,ScrollToTarget}}>
  {children}
 </ScrollContext.Provider>)
}
export const useScroll=()=>{
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
}