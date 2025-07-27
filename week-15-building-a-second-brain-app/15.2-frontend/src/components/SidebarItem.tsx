import type { ReactElement } from "react";

export const SidebarItem = ({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) => {
  return (
    <div className="flex text-[#48515f] py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150">
      <div className="pr-4">{icon}</div>
      <div>{text}</div>
    </div>
  );
};
