"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent } from "@/components/navbar/ui//sheet";
import { NavItems } from "@/config";
import { Menu } from "lucide-react";
import { signOut } from "next-auth/react";


export default function Header() {
  const navItems = NavItems();
  const [isOpen, setIsOpen] = useState(false);

  // Função para logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); // Desloga e redireciona para a página de login
  };

  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 justify-between bg-[#f9f6fc] dark:bg-[#070f18]">
      <div className="flex">
       

        <Link
          href="#"
          className="flex items-center gap-2 text-2xl font-extrabold text-blue-600 dark:text-blue-500 tracking-wide drop-shadow-md transition hover:text-blue-700 dark:hover:text-blue-400"
          prefetch={false}
        >
          <span>TripNotes</span>
        </Link>
      </div>
      <div className="ml-4 flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Sair
        </button>

        <button onClick={() => setIsOpen(true)} className="block sm:hidden">
          <Menu size={24} />
        </button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="block md:hidden">
            <div className="pt-4  overflow-y-auto h-fit w-full flex flex-col gap-1">
              {navItems.map((navItem, idx) => (
                <Link
                  key={idx}
                  href={navItem.href}
                  onClick={() => setIsOpen(false)}
                  className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                    navItem.active
                      ? "font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white"
                      : "hover:bg-neutral-200  hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                  }`}
                >
                  <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                    {navItem.icon}
                    <span>{navItem.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
