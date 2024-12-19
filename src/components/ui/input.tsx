import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  name?: string;
}

const Input=(({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  id,
  name,
}:InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full border border-gray-300 rounded border-solid md:p-2 focus:outline-none focus:ring focus:border-[#091E3A] text-black ${className}`}
      id={id}
      name={name}
      required
    />
  );
});

export default Input;