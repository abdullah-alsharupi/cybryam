import React from "react";

interface InputProps {
  label?: string;
  description?: string;
  type?: "email" | "text" | "password" | "phone" |"date";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  name?: string;
  error?: any;
  errorStyle?: React.CSSProperties;
  icon?: (focused: boolean) => React.ReactNode;
  onClickIcon?: () => void;
}

const Input = (
  (
    {
      label,
      description,
      type,
      placeholder,
      value,
      onChange,
      id,
      name,
      error,
      errorStyle,
    }:InputProps
    
  ) => {
    return (
      <div className="mb-4">
        {label && <label className="block mb-2 text-white">{label}</label>}
        <div className={`relative ${error ? 'border-red-500' : ''}`}>
        
          <input
            
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="bg-transparent border-b border-white text-white py-2 pl-10 pr-0 w-full focus:outline-none"
            id={id}
            name={name}
          />
        </div>
        {description && <p className="mt-2 text-gray-400">{description}</p>}
        {error && <p style={errorStyle} className="text-red-500">{error}</p>}
      </div>
    );
  }
);



export default Input;