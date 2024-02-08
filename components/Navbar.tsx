import Image from "next/image";

import Logo from "../public/images/logo.png";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <nav className="w-full fixed z-40">
      <div className="border px-4 md:px-16 py-6 flex flex-row items-center transition duration-1000 bg-zinc-900 bg-opacity-90 gap-x-8">
        <Image src={Logo} alt="Logo" className="h-4 w-auto lg:h-7" />

        <div className="hidden lg:flex flex-row gap-7 ">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;