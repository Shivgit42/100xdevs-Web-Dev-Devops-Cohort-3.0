import { useEffect, useState } from "react";
import { SidebarToggle } from "../Icons/SidebarToggle";
import { useMediaQuery } from "../hooks/useMediaQuery";
import webinarpng from "../../assets/webinar.png";
import profilePic from "../../assets/images.jpeg";
import { HomeSvg } from "../Icons/HomeSvg";
import { Settings } from "../Icons/Settings";
import Webinars from "../../assets/webinars.svg";
import Bills from "../../assets/bills.svg";
import User from "../../assets/user.svg";

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDesktop === false) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isDesktop]);

  if (!isSidebarOpen) {
    return (
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-0 left-0"
      >
        <div className="cursor-pointer hover:bg-slate-200 transition-all duration-300">
          <SidebarToggle />
        </div>
      </div>
    );
  }
  return (
    <div
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className=" w-96 h-screen bg-white shadow-lg z-50 absolute md:relative"
    >
      <div className="m-6 flex justify-between">
        <div className="flex bg-blue-950 w-27 h-9 px-2 py-2 rounded-xl justify-center items-center gap-1">
          <img
            className="w-5 h-5 flex align-content-center "
            src={webinarpng}
            alt="webinar image"
          />
          <span className="text-white text-xs">
            Webinar
            <span className="text-green-400 text-xs">.gg</span>
          </span>
        </div>
        <div className="">
          <img className="w-10 h-9 rounded-lg" src={profilePic} alt="" />
        </div>
      </div>
      <div className="mt-10 flex justify-between bg-slate-200 mx-6 rounded-xl px-4 py-2">
        <div className="text-slate-500 text-md">
          <span className="font-semibold">Home</span>
        </div>
        <div className="flex justify-center items-center ">
          <HomeSvg />
        </div>
      </div>
      <div className="mt-7 flex justify-between mx-6 rounded-xl px-4 py-2">
        <div className="text-slate-500 text-md">
          <span>Webinars</span>
        </div>
        <div className="flex justify-center items-center ">
          <img className="w-5 h-5" src={Webinars} alt="" />
        </div>
      </div>
      <div className="mt-7 flex justify-between mx-6 rounded-xl px-4 py-2">
        <div className="text-slate-500 text-md">
          <span>Billing</span>
        </div>
        <div className="flex justify-center items-center ">
          <img className="w-5 h-5" src={Bills} alt="" />
        </div>
      </div>
      <div className="mt-7 flex justify-between mx-6 rounded-xl px-4 py-2">
        <div className="text-slate-500 text-md">
          <span>User Management</span>
        </div>
        <div className="flex justify-center items-center ">
          <img className="w-5 h-5" src={User} alt="" />
        </div>
      </div>
      <div className="mt-7 flex justify-between mx-6 rounded-xl px-4 py-2">
        <div className="text-slate-500 text-md">
          <span>Settings</span>
        </div>
        <div className="flex justify-center items-center ">
          <Settings />
        </div>
      </div>
    </div>
  );
};
