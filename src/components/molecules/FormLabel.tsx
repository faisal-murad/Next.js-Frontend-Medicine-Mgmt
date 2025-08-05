import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type FormFieldProps = {
  children: React.ReactNode;
  htmlFor: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};


export const FormField = ({ children, htmlFor, type, name, value, onChange, required }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-2">
        {children}
      </label>
      <div className="relative">
        <input
          id={htmlFor}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 hover:border-gray-600 ${
            isPasswordField ? 'pr-12' : ''
          }`}
          placeholder={`Enter your ${String(children).toLowerCase()}`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:text-gray-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5" />
            ) : (
              <FaEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};