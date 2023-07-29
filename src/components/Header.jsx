"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [grammerTools, setGrammerTools] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div
      // className="shadow-md"
      className="fixed top-0 left-0 right-0 bg-white	z-[100]"
      style={{ borderBottom: "1px solid rgb(226 232 240)" }}
    >
      <div className="h-[65px] flex items-center justify-between lg:px-[30px] w-[95%] md:w-[85%] mx-auto ">
        <div className="logo">
          <img
            src="./images/logo.svg"
            alt=""
            className="w-[200px] sm:w-[250px]"
          />
          {/* <h1 className="text-[22px] font-semibold">Counter for Words</h1> */}
        </div>

        <div
          className="block md:hidden pr-[10px] cursor-pointer"
          onClick={() => setMobileMenu(true)}
        >
          <i class="fa-solid fa-bars text-[25px]"></i>
        </div>

        <div className="hidden gap-[40px] md:flex">
          {/* <div className="menu relative">
            <button
              className="text-[15px] hover:text-[blue] p-[10px]"
              onMouseEnter={() => setGrammerTools(true)}
              onMouseLeave={() => setGrammerTools(false)}
            >
              Grammar Tools
            </button>

            <div
              className="absolute z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-[250px]  top-[40px]"
              style={{ display: grammerTools ? "block" : "none" }}
              onMouseEnter={() => setGrammerTools(true)}
              onMouseLeave={() => setGrammerTools(false)}
            >
              <p className="text-[15px] p-[10px] cursor-pointer hover:bg-slate-200">
                Word Unscrambler
              </p>
              <p className="text-[15px] p-[10px] cursor-pointer hover:bg-slate-200">
                Character Counter
              </p>
              <p className="text-[15px] p-[10px] cursor-pointer hover:bg-slate-200">
                Grammar Checker
              </p>
              <p className="text-[15px] p-[10px] cursor-pointer hover:bg-slate-200">
                Random Word Generator
              </p>
              <p className="text-[15px] p-[10px] cursor-pointer hover:bg-slate-200">
                Random Letter Generator
              </p>
            </div>
          </div> */}
          <button className="text-[15px] hover:text-[blue] p-[10px]">
            Blog
          </button>
          <button className="text-[15px] hover:text-[blue] p-[10px]">
            Grammar
          </button>
          <button className="text-[15px] hover:text-[blue] p-[10px]">
            FAQ
          </button>
          <button
            className="text-[15px] hover:text-[blue] p-[10px]"
            onClick={() => router.push("/contact")}
          >
            Contact
          </button>
        </div>
        <div
          className="fixed top-[0] bg-[white] w-[100%] bottom-[0] left-0  bg-[black]"
          style={{
            opacity: mobileMenu ? "0.2" : "0",
            transition: "0.3s all",
            // left: mobileMenu ? "0" : "-200%",
            visibility: mobileMenu ? "visible" : "hidden",
          }}
          onClick={() => setMobileMenu(false)}
        ></div>
        <div
          className="fixed top-[0] bg-[white] w-[50%] bottom-[0]"
          style={{
            right: mobileMenu ? "0" : "-200%",
            transition: "0.3s all",
            opacity: mobileMenu ? "1" : "0",
          }}
        >
          <div className="flex flex-col items-end pr-[10px]">
            <button
              className="text-[15px] hover:text-[blue] p-[10px] pt-[20px]"
              onClick={() => setMobileMenu(false)}
            >
              <i class="fa-solid fa-xmark text-[25px]"></i>
            </button>
            <button className="text-[15px] hover:text-[blue] p-[10px]">
              Blog
            </button>
            <button className="text-[15px] hover:text-[blue] p-[10px]">
              Grammar
            </button>
            <button className="text-[15px] hover:text-[blue] p-[10px]">
              FAQ
            </button>
            <button className="text-[15px] hover:text-[blue] p-[10px]">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
