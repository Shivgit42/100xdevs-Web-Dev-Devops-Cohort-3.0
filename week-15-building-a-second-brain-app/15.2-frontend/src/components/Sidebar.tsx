import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="h-screen bg-white top-0 left-0 w-72 fixed border-r pl-6">
      <div className="flex text-2xl pt-6 items-center">
        <div className="pr-2 ">
          <Logo />
        </div>
        <span className="text-[#1f2937]">ReBrain</span>
      </div>
      <div className="pt-8 pl-2">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
};
