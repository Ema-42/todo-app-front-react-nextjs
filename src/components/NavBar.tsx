"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaTimes, FaTasks } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Solo acceder a localStorage en el cliente
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDarkMode(theme === "dark");
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    console.log("darkmode: ", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 left-0 w-full bg-[#2560E5] dark:bg-gray-700 text-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <FaTasks className="h-8 w-8 mr-2" />
            <span className="font-semibold text-xl">Todo App</span>
          </div>
          <div className="hidden md:block ">
            <div className="ml-10 flex items-baseline space-x-4">
              {session?.user ? (
                <>
                  <Link
                    href="/todo"
                    className="text-white hover:bg-[#4375ec] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Todos
                  </Link>
                  <Link
                    href="/users"
                    className="text-white hover:bg-[#4375ec] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="text-white hover:bg-[#4375ec] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/login"
                    className="text-white hover:bg-[#4375ec] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-white hover:bg-[#4375ec] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-white hover:bg-[#4375ec] px-3 py-2 rounded-md text-sm font-medium"
            >
              {isDarkMode ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </button>
            {session?.user && (
              <a
                onClick={() => signOut()}
                className=" text-white bg-rose-600 hover:bg-rose-700 inline-block text-sm px-4 py-2 leading-none   rounded     hover:border-transparent cursor-pointer  "
              >
                Log out
              </a>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleTheme}
              className="text-white hover:bg-[#4375ec] px-3 py-2 rounded-md text-sm font-medium mr-5"
            >
              {isDarkMode ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#4375ec] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2560E5] focus:ring-white"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {session?.user ? (
              <>
                <Link
                  href="/todo"
                  className="text-white hover:bg-[#4375ec] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Todos
                </Link>
                <Link
                  href="/users"
                  className="text-white hover:bg-[#4375ec] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Users
                </Link>

                <button
                  onClick={() => signOut()}
                  className="text-white bg-rose-600 hover:bg-rose-700 block w-[100%] px-3 py-2 rounded-md text-base font-medium"
                >
                  Signout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="text-white hover:bg-[#4375ec] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/login"
                  className="text-white hover:bg-[#4375ec] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-white hover:bg-[#4375ec] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
