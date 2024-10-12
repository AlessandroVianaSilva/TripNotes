"use client";

import Image from "next/image";
import travelerLogo from "../../public/images/Traveler-logo.svg";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
// import { Button } from "react-scroll";
import { useRouter } from "next/navigation";
import Button from "./Button";

const Header = () => {
  const [active, setActive] = useState(false);
  const [menuOpened, setmenuOpened] = useState(false);
  const toggleMenu = () => setmenuOpened(!menuOpened);
  const router = useRouter()
  // const {logout} = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        active
        ?
        "bg-white shadow-lg py-1 z-50"
        :
        "bg-white shadow-lg py-2 z-50"
      } fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300`}
    >
      <div className="mx-auto max-w-full px-6 lg:px-20 3xl:px-0 flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center justify-center">
          <Image
            src={travelerLogo}
            alt="Logo traveler"
            width={80}
            height={120}
          />
        </div>

        {/* web */}
        <Nav
          containerStyles={"hidden lg:flex gap-x-10 items-start justify-center"}
          linkStyles={"capitalize cursor-pointer my-4 relative transition-all"}
        />

        {/* mobile */}
        <Nav
          containerStyles={`${
            menuOpened
              ? "flex items-start flex-col justify-center fixed top-20 p-12 bg-white rounded-lg transition-all duration-500 shawdow-md right-0 w-60"
              : "flex items-start flex-col justify-center fixed top-20 p-12 bg-white rounded-lg transition-all duration-500 shawdow-md right-[-100%] w-60"
          }`}
          linkStyles={"capitalize cursor-pointer my-4 relative transition-all"}
        />

        {/* icones e botoes */}
        <div className="flex items-center justify-center">
          <div className="hidden lg:block">
            <Button
              // onClick={logout}
              type={"button"}
              title={"Sair"}
              // icon={'../user.svg'}
              variant={
                "text-[15px] font-[700] border bg-[#3a89ff] px-7 py-3 text-white transition-all rounded-full"
              }
            />
              {/* <button className="text-[15px] font-[700] border bg-[#3a89ff] px-7 py-3 text-white transition-all rounded-full">

              </button> */}
          </div>
          {!menuOpened ? (
            <IoMenu
              className="lg:hidden inline-block cursor-pointer text-[24px] font-[400] hover:text-gray-500"
              onClick={toggleMenu}
            />
          ) : (
            <IoClose
              className="lg:hidden inline-block cursor-pointer text-[24px] font-[400] hover:text-gray-500"
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
