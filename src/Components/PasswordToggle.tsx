import React, { useState, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label: string;
  showEyeIcon?: boolean;
}

const PasswordToogle: React.FC<PasswordInputProps> = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  error,
  label,
  showEyeIcon = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          ref={inputRef}
          type={isVisible ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
        {showEyeIcon && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600 hover:text-gray-800"
          >
            {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordToogle;
