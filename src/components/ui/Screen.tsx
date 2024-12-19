import React from "react";

type ScreenProps = {
  children: React.ReactNode;
  className?: string; // Optional className for additional styling
};

const Screen: React.FC<ScreenProps> = ({ children, className }) => {
  return (
    <div className={`flex flex-col gap-4 h-screen bg-white p-4 ${className}`} >
      {children}
    </div>
  );
};

export default Screen;
