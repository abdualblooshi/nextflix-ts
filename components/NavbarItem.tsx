import React from "react";

interface NavbarItemProps {
  label: string;
  active?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active }) => {
  return (
    <div
      className={`
        text-md
        ${
          active
            ? "text-white cursor-default font-bold"
            : "text-gray-200 hover:text-gray-300 cursor-pointer transition"
        }
      `}
    >
      {label}
    </div>
  );
};

export default NavbarItem;
