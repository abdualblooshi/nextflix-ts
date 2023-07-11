import Image from "next/image";
import NavbarItem from "./NavbarItem";
import AccountMenu from "./AccountMenu";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useState, useEffect } from "react";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuVisible((prev) => !prev);
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
             max-md:text-sm
            ${showBackground ? "bg-zinc-900/90" : "bg-transparent"}
        `}
      >
        <Image
          alt="Nextflix Logo"
          src={"/images/nextflix-text.png"}
          className="w-16 md:w-32"
          width={500}
          height={500}
        />
        <div
          className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex
            "
        >
          <NavbarItem label="Home" active />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-4 cursor-pointer relative"
        >
          <p className="text-white text-xs">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              isMobileMenuVisible ? "rotate-180" : ""
            }`}
          />
          <MobileMenu visible={isMobileMenuVisible} />
        </div>
        <div className="flex flex-row ml-auto gap-2 md:gap-7 items-center">
          <div className="text-white cursor-pointer hover:text-gray-300 transition">
            <BsSearch />
          </div>
          <div className="text-white cursor-pointer hover:text-gray-300 transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                alt="Profile"
                src={"/images/default-blue.png"}
                width={500}
                height={500}
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                isAccountMenuVisible ? "rotate-180" : ""
              }`}
            />
            <AccountMenu visible={isAccountMenuVisible} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
