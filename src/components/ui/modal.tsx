// components/Modal.tsx
import React, { useEffect } from "react";

interface ModalProps {
  open: boolean;
width?:any
  title?: string;
  className?:string
  children: React.ReactNode;
  backgroundColor?: string; // خاصية جديدة لتحديد لون الخلفية
}

const Modal: React.FC<ModalProps> = ({
  open,
title,className='w-full max-w-xl ',
  width,
  children,
  backgroundColor = "white", // القيمة الافتراضية هي الأبيض
}) => {
  // إغلاق المودال عند النقر خارج المودال


  if (!open) return null; // لا تعرض الـ Modal إذا لم يكن مفتوحًا

  return (
    <div className="fixed inset-0 z-[1]  flex items-center justify-center bg-black bg-opacity-50 modal-overlay">
    <div
    style={{ backgroundColor ,width:`${width}px`}} 
      className={`relative ${className} border-solid rounded-xl   max-sm:mx-[2%] max-sm:p-[2%]  sm:px-[30px] sm:py-[2%] shadow-lg `}
      // تطبيق الخلفية المحددة
    >
    
      <div>{children}</div>
    </div>
  </div>
  );
};

export default Modal;