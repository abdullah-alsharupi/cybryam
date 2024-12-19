"use client";
import { Color } from "@mui/material";
import { useRef, useState } from "react";

interface CardProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  height?: any;
  width?: any | 100;
  type?: "submit" | "reset" | "button" | undefined;
  children?: any;
  background?:any
}

const Card: React.FC<CardProps> = ({
  label,
  onClick,
  disabled = false,
  height,background,
  width,
  className = "",
  type,
  children,
}) => {
  


  return (
    <div   className={`bg-[#ffff] shadow-lg items-center  justify-center h-[${height}] w-[${width}]`}>
     
   {children}
    </div>
  );
};

export default Card;

