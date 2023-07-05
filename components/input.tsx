import React, { useState, useEffect } from "react";
import { BsCapslock } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleKeyPress = (event: KeyboardEvent) => {
    setIsCapsLockOn(event.getModifierState("CapsLock"));
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="relative">
      <input
        onChange={onChange}
        value={value}
        type={!isPasswordVisible && id === "password" ? "password" : "text"}
        maxLength={type === "tel" ? 16 : 100}
        id={id}
        className={`
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-white
          bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
          ${isCapsLockOn ? "caps-lock-on" : ""}
        `}
        placeholder=" "
      />
      {id === "password" && (
        <div
          className="absolute top-4 right-6 text-gray-400 cursor-pointer"
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? "HIDE" : "SHOW"}
        </div>
      )}
      {id === "password" && isCapsLockOn && (
        <div className="text-gray-400 text-md mt-2">
          <BsCapslock size={12} className="inline" /> Caps Lock is On
        </div>
      )}
      <label
        htmlFor={id}
        className={`
          absolute 
          text-md
          text-zinc-400
          duration-150 
          transform 
          -translate-y-3 
          scale-75 
          top-4 
          z-10 
          origin-[0] 
          left-6
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-3
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
